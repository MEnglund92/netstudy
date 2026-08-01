(function () {
  'use strict';

  // ===== DATA LAYER =====
  let allCards = [];
  let ready = false;

  // Stable, collision-free key: asset_type + unique text (verified 0 dup groups in the DB).
  function cardId(c) {
    return (c.asset_type || '?') + '|' + (c.question || c.prompt || c.symptoms || c.cloze_command || c.correct_answer || c.answer || '');
  }

  // ===== DUAL-SCHEMA HELPERS (canonical fields + legacy fields) =====
  function text(v) { return (v === null || v === undefined) ? '' : String(v); }
  function getQ(c) { return text(c.question || c.prompt || c.symptoms || c.scenario_output || c.topic || ''); }
  function getAns(c) { return text(c.answer || c.correct_answer || c.correct_root_cause || c.root_cause || c.recommended_fix || c.correct_approach || ''); }
  function getDiscCorrect(c) {
    if (Array.isArray(c.choices)) {
      var w = c.choices.find(function (x) { return x && x.is_correct; });
      if (w) return text(w.label || w.text || w);
    }
    return text(c.correct_answer || c.answer || '');
  }
  function getDiscCorrectSet(c) {
    if (Array.isArray(c.choices)) {
      var s = c.choices.filter(function (x) { return x && x.is_correct; }).map(function (x) { return text(x.label || x.text || x); }).filter(Boolean);
      if (s.length) return s;
    }
    var one = text(c.correct_answer || c.answer || '');
    return one ? [one] : [];
  }
  function getDiscWrong(c) {
    if (Array.isArray(c.choices)) {
      return c.choices.filter(function (x) { return x && !x.is_correct; }).map(function (x) { return text(x.label || x.text || x); });
    }
    return (c.distractors || []).map(text);
  }
  function getOrderSeq(c) {
    var s = c.correct_sequence || c.steps;
    if (Array.isArray(s)) return s.map(text);
    if (Array.isArray(c.answer)) return c.answer.map(text);
    return [];
  }
  function getOrderQ(c) { return text(c.question || c.prompt || c.topic || ''); }
  function getTroubSymptom(c) { return text(c.symptoms || c.scenario_output || ''); }
  function getTroubRoot(c) { return text(c.correct_root_cause || c.root_cause || c.answer || c.correct_answer || c.correct_approach || ''); }
  function getTroubRes(c) { return text(c.resolution || c.recommended_fix || ''); }
  function getClozeCmd(c) { return text(c.cloze_command || c.question || c.correct_answer || c.prompt || ''); }
  function getClozePrompt(c) { return text(c.prompt || c.question || ''); }
  function getClozeAnswer(c) {
    if (c.cloze !== undefined && c.cloze !== null && String(c.cloze).trim() !== '') {
      return String(c.cloze).split(/[|,;]/).map(function (t) { return t.trim(); }).filter(Boolean);
    }
    var cmd = getClozeCmd(c);
    var m = cmd.match(/\{\{c\d+::([^}]+)\}\}/g);
    if (m) return m.map(function (x) { return x.replace(/\{\{c\d+::/, '').replace(/\}\}$/, '').trim(); });
    return [cmd.trim()];
  }
  function cliRenderCmd(c, blank) {
    var cmd = getClozeCmd(c);
    var cleaned = cmd.replace(/\{\{c\d+::([^}]+)\}\}/g, '$1').replace(/<br\s*\/?>/gi, '\n');
    if (blank) {
      var tokens = getClozeAnswer(c);
      for (var i = 0; i < tokens.length; i++) {
        var t = tokens[i];
        if (t && t !== cmd.trim()) cleaned = cleaned.split(t).join('\u2581\u2581\u2581\u2581\u2581');
      }
    }
    return cleaned;
  }
  function cliBlankCount(c) {
    var cleaned = cliRenderCmd(c, false);
    return (cleaned.match(/\u2581{5}/g) || []).length;
  }
  function getExplain(c) { return text(c.explanation || c.hint || ''); }

  // Look up a command in the curated CLI help dictionary.
  // Strategy: exact match -> prefix match (longest pattern wins) -> token subsequence -> null.
  function cliExplain(cmd) {
    var dict = (window.cliCommandHelp && window.cliCommandHelp.length) ? window.cliCommandHelp : null;
    if (!dict || !cmd) return null;
    var clean = String(cmd).replace(/<br\s*\/?>/gi, '\n').split('\n')[0]
      .replace(/["'`]+/g, '').replace(/\s+/g, ' ').trim();
    if (!clean) return null;
    var low = clean.toLowerCase();
    var toks = clean.split(' ');
    var best = null, bestScore = 0;
    for (var i = 0; i < dict.length; i++) {
      var e = dict[i], p = String(e.p).toLowerCase(), score = 0;
      if (low === p) {
        score = 10000;
      } else if (low.indexOf(p) === 0) {
        var after = low.charAt(p.length);
        if (after === '' || after === ' ') score = 8000 + p.length;
      } else {
        var pt = p.split(' ');
        if (pt.length >= 2 && toks.length >= pt.length) {
          var ti = 0, ok = true;
          for (var j = 0; j < pt.length && ok; j++) {
            var found = false;
            for (; ti < toks.length; ti++) {
              if (toks[ti].toLowerCase() === pt[j]) { found = true; ti++; break; }
            }
            if (!found) ok = false;
          }
          if (ok) score = 7000 + p.length;
        }
      }
      if (score > bestScore) { bestScore = score; best = e; }
    }
    return best ? { d: best.d, o: best.o } : null;
  }
  function cliHelpHtml(cmd) {
    var x = cliExplain(cmd);
    if (!x) return '';
    var html = '<div class="cli-about"><div class="cli-about-head"><span class="cli-about-ico">ℹ️</span><span>About this command</span></div><div class="cli-about-body">' + esc(x.d);
    if (x.o) {
      html += '<div class="cli-about-opts">';
      for (var k in x.o) {
        if (Object.prototype.hasOwnProperty.call(x.o, k)) html += '<div class="cli-about-opt"><code>' + esc(k) + '</code><span>' + esc(x.o[k]) + '</span></div>';
      }
      html += '</div>';
    }
    html += '</div></div>';
    return html;
  }

  // ===== SM-2 STORAGE =====
  function sm2Key(k) { return 'ar_sm2_' + k; }
  function loadSm2(q) { try { return JSON.parse(localStorage.getItem(sm2Key(q))); } catch (e) { return null; } }
  function saveSm2(q, o) { localStorage.setItem(sm2Key(q), JSON.stringify(o)); }

  function defaultSm2() { return { ef: 2.5, iv: 0, rep: 0, nx: null, hist: [] }; }

  function getSm2(c) {
    var d = loadSm2(cardId(c));
    return d || defaultSm2();
  }

  function updateSm2(c, grade) {
    var sm = getSm2(c), ef = sm.ef, iv = sm.iv, rep = sm.rep;
    if (grade < 3) { rep = 0; iv = 1; }
    else {
      if (rep === 0) iv = 1; else if (rep === 1) iv = 6; else iv = Math.round(iv * ef);
      rep++;
    }
    ef = Math.max(1.3, ef + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)));
    var nx = new Date(Date.now() + iv * 86400000);
    sm.hist.push({ grade: grade, ts: Date.now() });
    sm.ef = ef; sm.iv = iv; sm.rep = rep; sm.nx = nx.toISOString();
    saveSm2(cardId(c), sm);
  }

  function isDue(c) {
    var sm = getSm2(c);
    if (!sm.nx) return true;
    return new Date(sm.nx) <= new Date();
  }

  // One-time migration from the old recall app's key scheme (ar_sm2_<question|prompt|symptoms>).
  function migrateOldKeys() {
    try {
      if (localStorage.getItem('ar_sm2_migrated_v2')) return;
      // Fast skip when no legacy keys exist at all (bounded scan).
      var hasLegacy = false, scan = Math.min(500, localStorage.length);
      for (var s = 0; s < scan; s++) {
        var sk = localStorage.key(s) || '';
        if (sk.indexOf('ar_sm2_') === 0 && sk !== 'ar_sm2_migrated_v2') { hasLegacy = true; break; }
      }
      if (!hasLegacy) { localStorage.setItem('ar_sm2_migrated_v2', '1'); return; }
      // Chunked so a large card set never blocks the UI.
      var n = 0, i = 0;
      function chunk() {
        var end = Math.min(i + 400, allCards.length);
        for (; i < end; i++) {
          var c = allCards[i];
          var old = c.question || c.prompt || c.symptoms || '';
          if (!old) continue;
          var k = sm2Key(cardId(c));
          if (localStorage.getItem(k)) continue;
          var v = localStorage.getItem('ar_sm2_' + old);
          if (v) { localStorage.setItem(k, v); n++; }
        }
        if (i < allCards.length) setTimeout(chunk, 0);
        else {
          if (n) console.log('study: migrated ' + n + ' SM-2 entries');
          localStorage.setItem('ar_sm2_migrated_v2', '1');
        }
      }
      chunk();
    } catch (e) { }
  }

  // Track studied today
  function todayStudied() {
    var n = 0, now = Date.now(), day = 86400000;
    for (var i = 0; i < allCards.length; i++) {
      var sm = getSm2(allCards[i]);
      var h = sm.hist || [];
      for (var j = 0; j < h.length; j++) {
        if (now - h[j].ts < day) n++;
      }
    }
    return n;
  }

  function streakDays() {
    var s = 0, d = new Date();
    while (true) {
      var found = false;
      for (var i = 0; i < allCards.length; i++) {
        var sm = getSm2(allCards[i]);
        var h = sm.hist || [];
        for (var j = 0; j < h.length; j++) {
          var hd = new Date(h[j].ts);
          if (hd.getFullYear() === d.getFullYear() && hd.getMonth() === d.getMonth() && hd.getDate() === d.getDate()) { found = true; break; }
        }
        if (found) break;
      }
      if (!found) break;
      s++; d.setDate(d.getDate() - 1);
    }
    return s;
  }

  // ===== DATA LOADING =====
  async function loadData() {
    var paths = ['data/ccna_active_recall.json', '../data/ccna_active_recall.json', 'data/ccna_active_recall.js'];
    for (var i = 0; i < paths.length; i++) {
      var p = paths[i];
      try {
        var r = await fetch(p);
        if (p.endsWith('.js')) {
          var txt = await r.text();
          var m = txt.match(/=\s*(\[[\s\S]*?\])\s*;/);
          if (m) allCards = JSON.parse(m[1]);
        } else {
          allCards = await r.json();
        }
        if (allCards.length) break;
      } catch (e) { }
    }
    // Legacy 'CLI' asset type (question=command, answer=description) is treated as CLOZE_SYNTAX.
    for (var k = 0; k < allCards.length; k++) {
      if (allCards[k] && allCards[k].asset_type === 'CLI') {
        allCards[k].asset_type = 'CLOZE_SYNTAX';
        if (!allCards[k].cloze_command) allCards[k].cloze_command = allCards[k].question;
        if (!allCards[k].explanation && allCards[k].answer) allCards[k].explanation = allCards[k].answer;
      }
    }
    if (!allCards.length) loadFailed = true;
    migrateOldKeys();
    populateExDomain();
    ready = true;

  function populateExDomain() {
    var sel = $('exDomain');
    if (!sel) return;
    var domains = uniq(allCards.map(function (c) { return c.domain; }).filter(Boolean)).sort();
    sel.innerHTML = '<option value="">All Domains</option>' + domains.map(function (d) { return '<option value="' + esc(d) + '">' + esc(d) + '</option>'; }).join('');
  }
  }

  // ===== UTILITIES =====
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function $(id) { return document.getElementById(id); }
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function uniq(a) { return Array.from(new Set(a)); }

  var TYPE_LABELS = {
    FLASHCARD: 'Flashcard', CLOZE_SYNTAX: 'CLI Command', DISCRIMINATION: 'Discrimination',
    TROUBLESHOOTING: 'Troubleshooting', ORDERING: 'Ordering'
  };

  // ===== RENDERERS =====
  function renderCard(c) {
    var t = c.asset_type;
    if (t === 'FLASHCARD') return renderFlashcard(c);
    if (t === 'CLOZE_SYNTAX') return renderCLI(c);
    if (t === 'DISCRIMINATION') return renderDiscrimination(c);
    if (t === 'TROUBLESHOOTING') return renderTroubleshooting(c);
    if (t === 'ORDERING') return renderOrdering(c);
    return '<div class="empty-state">Unknown type: ' + esc(t) + '</div>';
  }

  function renderFlashcard(c) {
    var sm = getSm2(c);
    return '<div class="fc-card">' +
      '<div class="fc-inner">' +
      '<div class="fc-front"><div class="fc-label">Question</div><div class="fc-text">' + esc(getQ(c)) + '<button class="speak-btn fc-speak" data-text="' + esc(getQ(c)) + '" type="button" title="Pronounce" aria-label="Pronounce">🔊</button></div></div>' +
      '<div class="fc-back"><div class="fc-label">Answer</div><div class="fc-text">' + esc(getAns(c)) + '<button class="speak-btn fc-speak" data-text="' + esc(getAns(c)) + '" type="button" title="Pronounce" aria-label="Pronounce">🔊</button></div></div>' +
      '</div></div>' +
      '<div class="fc-meta">' + esc(c.domain) + ' · ' + esc(c.topic) + (sm.nx ? ' · Next review: ' + new Date(sm.nx).toLocaleDateString() : '') + '</div>';
  }

  function renderCLI(c) {
    var cleaned = cliRenderCmd(c, true);
    return '<div class="cli-display">' +
      '<div class="cli-label">Command</div>' +
      '<pre class="cli-pre">' + esc(cleaned || getClozeCmd(c)) + '</pre>' +
      (getExplain(c) ? '<div class="fc-label" style="margin-top:12px">Explanation</div><div class="cli-explain">' + esc(getExplain(c)) + '</div>' : '') +
      '</div>';
  }

  function renderDiscrimination(c) {
    var correctSet = getDiscCorrectSet(c);
    var wrong = getDiscWrong(c);
    var multi = correctSet.length > 1;
    var correct = correctSet.slice();
    if (multi && correct.length + wrong.length > 8) {
      shuffle(correct); shuffle(wrong);
      correct = correct.slice(0, 4);
      wrong = wrong.slice(0, 4);
    }
    var opts = correct.concat(wrong);
    shuffle(opts);
    var html = '<div class="disc-q">' + esc(getQ(c)) + '</div>' +
      '<div class="disc-opts" data-multi="' + (multi ? '1' : '0') + '" data-correct="' + esc(multi ? JSON.stringify(correct) : correct[0]).replace(/"/g, '&quot;') + '">' +
      opts.map(function (o, i) {
        return '<button class="disc-opt" data-idx="' + i + '" data-correct="' + (correct.indexOf(o) >= 0 ? '1' : '0') + '" type="button">' + esc(o) + '</button>';
      }).join('') + '</div>';
    if (multi) html += '<button class="action-btn disc-check-btn" type="button">Check Answer</button>';
    html += '<div class="disc-exp" style="display:none">' + esc(getExplain(c)) + '</div>';
    return html;
  }

  // Grades a rendered discrimination card (single- or multi-select) and reveals the answer.
  function gradeDisc(el) {
    var wrap = el.querySelector('.disc-opts');
    var multi = wrap.dataset.multi === '1';
    var opts = el.querySelectorAll('.disc-opt');
    var sel = [];
    for (var i = 0; i < opts.length; i++) if (opts[i].classList.contains('disc-sel')) sel.push(opts[i].textContent.trim());
    var ok;
    if (multi) {
      var correctSet = [];
      try { correctSet = JSON.parse(wrap.dataset.correct || '[]'); } catch (e) { correctSet = []; }
      ok = sel.length === correctSet.length && correctSet.every(function (v) { return sel.indexOf(v) >= 0; });
    } else {
      ok = sel.length === 1 && sel[0] === wrap.dataset.correct;
    }
    for (var k = 0; k < opts.length; k++) {
      var b = opts[k];
      if (b.dataset.graded) continue;
      var isC = b.dataset.correct === '1';
      if (isC) b.classList.add('disc-correct');
      if (b.classList.contains('disc-sel') && !isC) b.classList.add('disc-wrong');
      b.disabled = true;
      b.dataset.graded = isC ? '1' : '0';
    }
    var exp = el.querySelector('.disc-exp');
    if (exp) exp.style.display = 'block';
    return ok;
  }

  function renderTroubleshooting(c) {
    var steps = c.troubleshooting_steps || [];
    return '<div class="ts-symptom"><strong>Symptoms:</strong> ' + esc(getTroubSymptom(c) || getQ(c)) + '</div>' +
      (steps.length ? '<div class="ts-steps">' + steps.map(function (s, i) {
        return '<details class="ts-step"><summary>Step ' + (i + 1) + '</summary><div class="ts-body">' + esc(s) + '</div></details>';
      }).join('') + '</div>' : '') +
      '<div class="ts-answer" style="display:none">' +
      '<div class="ts-rc"><strong>Root Cause:</strong> ' + esc(getTroubRoot(c)) + '</div>' +
      (getTroubRes(c) ? '<div class="ts-res"><strong>Resolution:</strong> ' + esc(getTroubRes(c)) + '</div>' : '') +
      (getExplain(c) ? '<div class="ts-exp"><strong>Explanation:</strong> ' + esc(getExplain(c)) + '</div>' : '') +
      '</div>' +
      '<button class="action-btn ts-reveal-btn">Reveal Root Cause</button>';
  }

  function renderOrdering(c) {
    var seq = getOrderSeq(c);
    var shuffled = shuffle(seq.slice());
    return '<div class="ord-q">' + esc(getOrderQ(c)) + '</div>' +
      '<div class="ord-list">' + shuffled.map(function (s, i) {
        return '<div class="ord-item" draggable="true" data-idx="' + i + '">☰ ' + esc(s) + '</div>';
      }).join('') + '</div>' +
      '<div class="ord-answer" style="display:none">' +
      '<div class="ord-correct">' + seq.map(function (s, i) {
        return '<div>' + (i + 1) + '. ' + esc(s) + '</div>';
      }).join('') + '</div>' +
      (getExplain(c) ? '<div class="ord-exp">' + esc(getExplain(c)) + '</div>' : '') +
      '</div>' +
      '<button class="action-btn ord-check-btn">Check Order</button>';
  }

  // ===== CARD INTERACTIONS =====
  function bindSpeakButtons(scope) {
    var btns = scope.querySelectorAll('.fc-speak');
    for (var i = 0; i < btns.length; i++) (function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var t = b.getAttribute('data-text');
        if (t && window.appAudio && window.appAudio.play) window.appAudio.play(t);
      });
    })(btns[i]);
  }

  function bindCardEvents(el, c) {
    var t = c.asset_type;
    if (t === 'DISCRIMINATION') {
      var opts = el.querySelectorAll('.disc-opt');
      for (var i = 0; i < opts.length; i++) {
        (function (btn) {
          btn.addEventListener('click', function () {
            if (btn.dataset.graded || btn.disabled) return;
            var wrap = btn.parentElement;
            if (wrap.dataset.multi === '1') {
              btn.classList.toggle('disc-sel');
            } else {
              for (var k = 0; k < opts.length; k++) opts[k].classList.remove('disc-sel');
              btn.classList.add('disc-sel');
              gradeDisc(el);
            }
          });
        })(opts[i]);
      }
      var chk = el.querySelector('.disc-check-btn');
      if (chk) chk.addEventListener('click', function () {
        if (el.querySelector('.disc-opt[data-graded]')) return;
        gradeDisc(el);
      });
    }
    if (t === 'TROUBLESHOOTING') {
      var rbtn = el.querySelector('.ts-reveal-btn');
      if (rbtn) rbtn.addEventListener('click', function () {
        var a = el.querySelector('.ts-answer');
        if (a) a.style.display = 'block';
        rbtn.style.display = 'none';
      });
    }
    if (t === 'ORDERING') {
      var items = el.querySelectorAll('.ord-item'), dragSrc = null;
      for (var j = 0; j < items.length; j++) {
        (function (item) {
          item.addEventListener('dragstart', function (e) { dragSrc = item; e.dataTransfer.effectAllowed = 'move'; });
          item.addEventListener('dragover', function (e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
          item.addEventListener('drop', function (e) {
            e.preventDefault();
            if (dragSrc && dragSrc !== item) {
              var p = item.parentNode;
              p.insertBefore(dragSrc, item.nextSibling);
            }
          });
          item.addEventListener('dragend', function () { dragSrc = null; });
          item.addEventListener('touchstart', function () { dragSrc = item; item.style.opacity = '0.5'; }, { passive: true });
          item.addEventListener('touchmove', function (e) {
            e.preventDefault();
            var touch = e.touches[0];
            var el2 = document.elementFromPoint(touch.clientX, touch.clientY);
            if (el2 && el2.classList.contains('ord-item') && dragSrc && el2 !== dragSrc) {
              var p2 = item.parentNode;
              p2.insertBefore(dragSrc, el2.nextSibling);
            }
          }, { passive: false });
          item.addEventListener('touchend', function () {
            if (dragSrc) { dragSrc.style.opacity = '1'; dragSrc = null; }
          }, { passive: true });
        })(items[j]);
      }
      var cbtn = el.querySelector('.ord-check-btn');
      if (cbtn) cbtn.addEventListener('click', function () {
        var list = el.querySelector('.ord-list');
        var userOrder = Array.prototype.map.call(list.querySelectorAll('.ord-item'), function (d) { return d.textContent.replace(/^☰ /, ''); });
        var correct = getOrderSeq(c);
        var match = userOrder.length === correct.length && userOrder.every(function (v, i) { return v === correct[i]; });
        if (match) {
          list.style.borderColor = 'var(--success)';
          cbtn.textContent = '✓ Correct!';
        } else {
          list.style.borderColor = 'var(--error)';
          cbtn.textContent = '✗ Incorrect — see correct order';
        }
        var ans = el.querySelector('.ord-answer');
        if (ans) ans.style.display = 'block';
      });
    }
  }

  // ===== STUDY SESSION =====
  var ssnQueue = [], ssnIdx = 0, ssnAnswered = 0, ssnShowingAnswer = false, ssnAnsweredByType = {}, ssnRatedPos = -1;

  function startStudy() {
    if (!ready || loadFailed) return;
    var count = parseInt($('ssnCount').value) || 20;
    var mix = $('ssnMix').value;
    var pool = allCards.filter(function (c) { return c.asset_type !== undefined; });
    if (mix === 'flashcard') pool = pool.filter(function (c) { return c.asset_type === 'FLASHCARD'; });
    else if (mix === 'discrimination') pool = pool.filter(function (c) { return c.asset_type === 'DISCRIMINATION'; });
    else if (mix === 'ordering') pool = pool.filter(function (c) { return c.asset_type === 'ORDERING'; });
    else if (mix === 'troubleshooting') pool = pool.filter(function (c) { return c.asset_type === 'TROUBLESHOOTING'; });
    else if (mix === 'cloze') pool = pool.filter(function (c) { return c.asset_type === 'CLOZE_SYNTAX'; });
    var due = pool.filter(isDue), review = pool.filter(function (c) { return !isDue(c) && getSm2(c).rep > 0; }), fresh = pool.filter(function (c) { return getSm2(c).rep === 0; });
    shuffle(due); shuffle(review); shuffle(fresh);
    ssnQueue = (count === 0 ? due : due.concat(fresh).concat(review).slice(0, count));
    if (ssnQueue.length === 0) {
      $('ssnCard').innerHTML = '<div class="empty-state">No cards due. Pick a different mix or increase the count.</div>';
      $('ssnRatings').style.display = 'none'; $('ssnNextBtn').style.display = 'none'; $('ssnDoneBtn').style.display = 'none'; $('ssnPrevBtn').style.display = 'none';
      return;
    }
    ssnIdx = 0; ssnAnswered = 0; ssnShowingAnswer = false; ssnAnsweredByType = {}; ssnRatedPos = -1;
    $('studySetup').style.display = 'none'; $('studyArea').style.display = 'block'; $('ssnResult').style.display = 'none';
    $('ssnDoneBtn').style.display = 'inline-block';
    showSsnCard();
  }

  function showSsnCard() {
    if (ssnIdx >= ssnQueue.length) { finishStudy(); return; }
    var c = ssnQueue[ssnIdx];
    $('ssnIdx').textContent = ssnIdx + 1; $('ssnTotal').textContent = ssnQueue.length;
    $('ssnBar').style.width = ((ssnIdx) / ssnQueue.length * 100) + '%';
    $('ssnCard').innerHTML = '<div class="ssn-type-badge">' + esc(TYPE_LABELS[c.asset_type] || c.asset_type || 'Card') + '</div>' + renderCard(c);
    bindSpeakButtons($('ssnCard'));
    $('ssnRatings').style.display = 'none'; $('ssnNextBtn').style.display = 'none'; $('ssnDoneBtn').style.display = 'inline-block';
    $('ssnPrevBtn').style.display = 'inline-block'; $('ssnPrevBtn').disabled = ssnIdx === 0;
    ssnShowingAnswer = false;
    bindCardEvents($('ssnCard'), c);
    var t = c.asset_type;
    if (t === 'FLASHCARD') {
      var fc = $('ssnCard').querySelector('.fc-card');
      if (fc) fc.addEventListener('click', function () {
        fc.classList.toggle('flipped');
        if (fc.classList.contains('flipped')) { ssnShowingAnswer = true; $('ssnRatings').style.display = 'flex'; }
      });
    } else if (t === 'TROUBLESHOOTING') {
      var rb = $('ssnCard').querySelector('.ts-reveal-btn');
      if (rb) rb.addEventListener('click', function () {
        var a = $('ssnCard').querySelector('.ts-answer');
        if (a) a.style.display = 'block';
        rb.style.display = 'none';
        ssnShowingAnswer = true; $('ssnRatings').style.display = 'flex';
      });
    } else if (t === 'ORDERING') {
      var ob = $('ssnCard').querySelector('.ord-check-btn');
      if (ob) ob.addEventListener('click', function () {
        var list = $('ssnCard').querySelector('.ord-list');
        var userOrder = Array.prototype.map.call(list.querySelectorAll('.ord-item'), function (d) { return d.textContent.replace(/^☰ /, ''); });
        var correct = getOrderSeq(c);
        var match = userOrder.length === correct.length && userOrder.every(function (v, i) { return v === correct[i]; });
        list.style.borderColor = match ? 'var(--success)' : 'var(--error)';
        ob.textContent = match ? '✓ Correct!' : '✗ Incorrect';
        var ans = $('ssnCard').querySelector('.ord-answer');
        if (ans) ans.style.display = 'block';
        ssnShowingAnswer = true; $('ssnRatings').style.display = 'flex'; $('ssnNextBtn').style.display = 'inline-block';
      });
    }
    if (t === 'CLOZE_SYNTAX') {
      ssnShowingAnswer = true; $('ssnRatings').style.display = 'flex';
    }
    if (t === 'DISCRIMINATION') {
      var obs = new MutationObserver(function () {
        var exp = $('ssnCard').querySelector('.disc-exp');
        if (exp && exp.style.display === 'block') {
          ssnShowingAnswer = true; $('ssnRatings').style.display = 'flex'; $('ssnNextBtn').style.display = 'inline-block';
          obs.disconnect();
        }
      });
      obs.observe($('ssnCard'), { subtree: true, attributes: true, attributeFilter: ['style'] });
      setTimeout(function () { obs.disconnect(); }, 10000);
    }
    $('ssnNextBtn').onclick = function () { ssnIdx++; showSsnCard(); };
    $('ssnPrevBtn').onclick = function () { if (ssnIdx > 0) { ssnIdx--; showSsnCard(); } };
  }

  $('ssnRatings').addEventListener('click', function (e) {
    var btn = e.target.closest('.sm2-btn');
    if (!btn) return;
    var grade = parseInt(btn.dataset.grade);
    if (ssnIdx < ssnQueue.length && ssnRatedPos !== ssnIdx) {
      ssnRatedPos = ssnIdx;
      updateSm2(ssnQueue[ssnIdx], grade); ssnAnswered++;
      addXp(2);
      var t = ssnQueue[ssnIdx].asset_type || '?';
      ssnAnsweredByType[t] = (ssnAnsweredByType[t] || 0) + 1;
      $('ssnRatings').style.display = 'none'; $('ssnNextBtn').style.display = 'inline-block';
    }
  });

  function finishStudy() {
    invalidateSm2Stats();
    $('studyArea').style.display = 'block'; $('ssnCard').innerHTML = '';
    $('ssnRatings').style.display = 'none'; $('ssnNextBtn').style.display = 'none'; $('ssnDoneBtn').style.display = 'none'; $('ssnPrevBtn').style.display = 'none';
    $('ssnResult').style.display = 'block';
    var byType = {};
    for (var i = 0; i < ssnQueue.length; i++) {
      var t = ssnQueue[i].asset_type || '?';
      byType[t] = (byType[t] || 0) + 1;
    }
    var html = '<div class="ssn-stat">' + ssnAnswered + ' of ' + ssnQueue.length + ' cards reviewed</div>' +
      '<div class="ssn-stat">' + (ssnQueue.length - ssnAnswered) + ' skipped</div>';
    var rows = Object.keys(byType).map(function (t) {
      return '<div class="ssn-stat ssn-type-stat"><span>' + (TYPE_LABELS[t] || t) + '</span><span>' + (ssnAnsweredByType[t] || 0) + ' / ' + byType[t] + '</span></div>';
    });
    if (rows.length) html += '<div class="ssn-type-break">' + rows.join('') + '</div>';
    $('ssnStats').innerHTML = html;
  }

  $('ssnStartBtn').addEventListener('click', startStudy);
  $('ssnRestart').addEventListener('click', function () { $('studySetup').style.display = 'block'; $('studyArea').style.display = 'none'; $('ssnResult').style.display = 'none'; });
  $('ssnDoneBtn').addEventListener('click', function () { if (confirm('End session early?')) finishStudy(); });

  // ===== GAMIFICATION (XP / LEVEL / STREAK) =====
  var GAME_KEY = 'netstudy_gamestate';
  function pad2(n) { return n < 10 ? '0' + n : '' + n; }
  function dayStr(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }
  function loadGame() {
    try { var g = JSON.parse(localStorage.getItem(GAME_KEY)); if (g && typeof g.xp === 'number') return g; } catch (e) { }
    return { xp: 0, streak: 0, lastXpDay: '' };
  }
  function saveGame(g) { try { localStorage.setItem(GAME_KEY, JSON.stringify(g)); } catch (e) { } }
  function emitGame() { window.dispatchEvent(new CustomEvent('netstudy-game')); }
  function getLevelInfo() {
    var g = loadGame();
    var level = Math.floor(g.xp / 100) + 1;
    var prev = (level - 1) * 100, next = level * 100;
    var pct = Math.round((g.xp - prev) / (next - prev) * 100);
    return { level: level, xp: g.xp, streak: g.streak || 0, pct: Math.max(0, Math.min(100, pct)) };
  }
  function addXp(n) {
    var g = loadGame();
    var today = dayStr(new Date());
    if (g.lastXpDay !== today) {
      var y = new Date(Date.now() - 86400000);
      g.streak = (g.lastXpDay === dayStr(y)) ? (g.streak || 0) + 1 : 1;
      g.lastXpDay = today;
    }
    g.xp += n;
    saveGame(g);
    emitGame();
    return g;
  }

  // ===== WEAK WORDS =====
  var wQueue = [], wIdx = 0, wRatedPos = -1, wAnswered = 0, wShowingAnswer = false;

  function weakCards() {
    return allCards.filter(function (c) {
      var s = getSm2(c);
      if (!s.rep || !(s.hist && s.hist.length)) return false;
      var last = s.hist[s.hist.length - 1].grade;
      return s.ef < 2.0 || last <= 2;
    }).sort(function (a, b) { return (getSm2(a).ef || 2.5) - (getSm2(b).ef || 2.5); });
  }
  function lastGrade(c) { var s = getSm2(c); return s.hist && s.hist.length ? s.hist[s.hist.length - 1].grade : -1; }

  function renderWeak() {
    if (!ready) { if ($('weakLoading')) $('weakLoading').style.display = 'block'; return; }
    if ($('weakLoading')) $('weakLoading').style.display = 'none';
    var weak = weakCards();
    var list = $('weakList');
    $('weakPractice').style.display = 'none';
    if (!weak.length) {
      list.innerHTML = '<div class="empty-state"><div class="empty-icon">🎉</div><div class="empty-text">No weak words!</div><div class="empty-sub">Keep rating cards 3+ in Study sessions and nothing lands here.</div></div>';
      return;
    }
    list.innerHTML = '<div class="review-title">🔁 ' + weak.length + ' weak card' + (weak.length === 1 ? '' : 's') + ' (ease factor &lt; 2.0 or last rating ≤ 2)</div>' +
      weak.map(function (c, i) {
        var s = getSm2(c);
        return '<div class="review-card">' +
          '<div class="r-phrase">' + (i + 1) + '. ' + esc(getQ(c)) + '</div>' +
          '<div class="r-meaning">' + esc(getAns(c) || getDiscCorrect(c) || getClozeCmd(c)) + '</div>' +
          '<div class="r-translation">EF ' + (s.ef || 2.5).toFixed(2) + ' · last rating ' + lastGrade(c) + ' · ' + esc(c.domain || '') + '</div>' +
        '</div>';
      }).join('');
  }

  function populateWeakSetup() {
    var sel = $('weakDomain');
    if (!sel || sel.options.length) return;
    var doms = uniq(allCards.map(function (c) { return c.domain; }).filter(Boolean)).sort();
    sel.innerHTML = '<option value="all">All areas</option>' + doms.map(function (d) { return '<option value="' + esc(d) + '">' + esc(d) + '</option>'; }).join('');
  }
  function startWeakPractice() {
    var pool = weakCards();
    var dom = $('weakDomain') ? $('weakDomain').value : 'all';
    if (dom && dom !== 'all') pool = pool.filter(function (c) { return (c.domain || '') === dom; });
    var mix = $('weakMix') ? $('weakMix').value : 'mixed';
    if (mix === 'flashcard') pool = pool.filter(function (c) { return c.asset_type === 'FLASHCARD'; });
    else if (mix === 'discrimination') pool = pool.filter(function (c) { return c.asset_type === 'DISCRIMINATION'; });
    else if (mix === 'ordering') pool = pool.filter(function (c) { return c.asset_type === 'ORDERING'; });
    else if (mix === 'troubleshooting') pool = pool.filter(function (c) { return c.asset_type === 'TROUBLESHOOTING'; });
    else if (mix === 'cloze') pool = pool.filter(function (c) { return c.asset_type === 'CLOZE_SYNTAX'; });
    var count = parseInt($('weakCount') ? $('weakCount').value : 0, 10) || 0;
    if (count > 0) pool = pool.slice(0, count);
    wQueue = pool;
    if (!wQueue.length) { renderWeak(); return; }
    wIdx = 0; wRatedPos = -1; wAnswered = 0;
    $('weakList').style.display = 'none';
    $('weakPractice').style.display = 'block';
    $('wResult').style.display = 'none';
    $('wDoneBtn').style.display = 'inline-block';
    showWCard();
  }
  function showWCard() {
    if (wIdx >= wQueue.length) { finishWeak(); return; }
    var c = wQueue[wIdx];
    $('wIdx').textContent = wIdx + 1; $('wTotal').textContent = wQueue.length;
    $('wBar').style.width = ((wIdx) / wQueue.length * 100) + '%';
    $('wCard').innerHTML = '<div class="ssn-type-badge">' + esc(TYPE_LABELS[c.asset_type] || c.asset_type || 'Card') + '</div>' + renderCard(c);
    bindSpeakButtons($('wCard'));
    $('wRatings').style.display = 'none'; $('wNextBtn').style.display = 'none'; $('wDoneBtn').style.display = 'inline-block';
    $('wPrevBtn').style.display = 'inline-block'; $('wPrevBtn').disabled = wIdx === 0;
    wShowingAnswer = false;
    bindCardEvents($('wCard'), c);
    var t = c.asset_type;
    if (t === 'FLASHCARD') {
      var fc = $('wCard').querySelector('.fc-card');
      if (fc) fc.addEventListener('click', function () {
        fc.classList.toggle('flipped');
        if (fc.classList.contains('flipped')) { wShowingAnswer = true; $('wRatings').style.display = 'flex'; }
      });
    } else if (t === 'TROUBLESHOOTING') {
      var rb = $('wCard').querySelector('.ts-reveal-btn');
      if (rb) rb.addEventListener('click', function () {
        var a = $('wCard').querySelector('.ts-answer');
        if (a) a.style.display = 'block';
        rb.style.display = 'none';
        wShowingAnswer = true; $('wRatings').style.display = 'flex';
      });
    } else if (t === 'ORDERING') {
      var ob = $('wCard').querySelector('.ord-check-btn');
      if (ob) ob.addEventListener('click', function () {
        var list = $('wCard').querySelector('.ord-list');
        var userOrder = Array.prototype.map.call(list.querySelectorAll('.ord-item'), function (d) { return d.textContent.replace(/^☰ /, ''); });
        var correct = getOrderSeq(c);
        var match = userOrder.length === correct.length && userOrder.every(function (v, i) { return v === correct[i]; });
        list.style.borderColor = match ? 'var(--success)' : 'var(--error)';
        ob.textContent = match ? '✓ Correct!' : '✗ Incorrect';
        var ans = $('wCard').querySelector('.ord-answer');
        if (ans) ans.style.display = 'block';
        wShowingAnswer = true; $('wRatings').style.display = 'flex'; $('wNextBtn').style.display = 'inline-block';
      });
    }
    if (t === 'CLOZE_SYNTAX') { wShowingAnswer = true; $('wRatings').style.display = 'flex'; }
    if (t === 'DISCRIMINATION') {
      var obs = new MutationObserver(function () {
        var exp = $('wCard').querySelector('.disc-exp');
        if (exp && exp.style.display === 'block') {
          wShowingAnswer = true; $('wRatings').style.display = 'flex'; $('wNextBtn').style.display = 'inline-block';
          obs.disconnect();
        }
      });
      obs.observe($('wCard'), { subtree: true, attributes: true, attributeFilter: ['style'] });
      setTimeout(function () { obs.disconnect(); }, 10000);
    }
    $('wNextBtn').onclick = function () { wIdx++; showWCard(); };
    $('wPrevBtn').onclick = function () { if (wIdx > 0) { wIdx--; showWCard(); } };
  }
  $('wRatings').addEventListener('click', function (e) {
    var btn = e.target.closest('.sm2-btn');
    if (!btn) return;
    var grade = parseInt(btn.dataset.grade);
    if (wIdx < wQueue.length && wRatedPos !== wIdx) {
      wRatedPos = wIdx;
      updateSm2(wQueue[wIdx], grade); wAnswered++;
      addXp(2);
      $('wRatings').style.display = 'none'; $('wNextBtn').style.display = 'inline-block';
    }
  });
  function finishWeak() {
    invalidateSm2Stats();
    $('wCard').innerHTML = '';
    $('wRatings').style.display = 'none'; $('wNextBtn').style.display = 'none'; $('wDoneBtn').style.display = 'none'; $('wPrevBtn').style.display = 'none';
    $('wResult').style.display = 'block';
    $('wStats').innerHTML = '<div class="ssn-stat">' + wAnswered + ' of ' + wQueue.length + ' weak cards reviewed</div>' +
      '<div class="ssn-stat">' + (wQueue.length - wAnswered) + ' skipped</div>';
  }
  $('weakStartBtn').addEventListener('click', startWeakPractice);
  $('wDoneBtn').addEventListener('click', function () { if (confirm('End weak session early?')) finishWeak(); });
  $('wRestart').addEventListener('click', function () { $('weakList').style.display = 'block'; $('weakPractice').style.display = 'none'; renderWeak(); });
  $('weakResetBtn').addEventListener('click', function () {
    var weak = weakCards();
    if (!weak.length) return;
    if (confirm('Reset SM-2 progress for ' + weak.length + ' weak card(s)? They will be treated as new.')) {
      for (var i = 0; i < weak.length; i++) localStorage.removeItem(sm2Key(cardId(weak[i])));
      invalidateSm2Stats();
      renderWeak();
    }
  });

  // ===== CLI LAB =====
  var cliCards = [], cliIdx = 0, cliStudyMode = false, cliStepMode = false, cliListShown = 50;
  var cliStepWords = [], cliStepDone = [], cliStepPos = 0;

  function cliClean(c) { return cliRenderCmd(c, false); }
  function cliShowAnswer(c) {
    $('cliAnswer').textContent = cliRenderCmd(c, false); $('cliAnswer').style.display = 'block';
    if (getExplain(c)) { $('cliExplanation').textContent = getExplain(c); $('cliExplanation').style.display = 'block'; }
    else { $('cliExplanation').style.display = 'none'; }
  }
  function cliHideAnswer() { $('cliAnswer').style.display = 'none'; $('cliExplanation').style.display = 'none'; }
  function cliStepWordsOf(cmd) {
    return cmd.replace(/^\S+\s*[#>]\s*/, '').trim().split(/\s+/).filter(Boolean);
  }
  function cliStepReset(c) {
    cliStepWords = cliStepWordsOf(cliRenderCmd(c, false));
    cliStepDone = []; cliStepPos = 0;
    for (var i = 0; i < cliStepWords.length; i++) cliStepDone.push(false);
  }
  function cliStepNextUndone() {
    for (var i = 0; i < cliStepDone.length; i++) if (!cliStepDone[i]) return i;
    return -1;
  }
  function cliStepRenderSlots() {
    var box = $('cliSlots'); if (!box) return;
    var html = '<div class="cli-slot-label">Type each word of the command, press <kbd>Enter</kbd> after each word.</div>';
    for (var i = 0; i < cliStepWords.length; i++) {
      var cls = '';
      if (cliStepDone[i]) cls = ' done';
      else if (i === cliStepPos) cls = ' current';
      var w = cliStepWords[i];
      html += '<span class="cli-slot' + cls + '">' +
        (cliStepDone[i] ? esc(w) : '•'.repeat(Math.max(2, w.length))) + '</span>';
    }
    box.innerHTML = html;
    box.style.display = 'block';
  }
  function applyCliMode() {
    if (cliCards.length === 0) return;
    var s = $('cliSuggest'); if (s) s.style.display = 'none';
    if (cliStepMode) {
      $('cliInput').disabled = false;
      $('cliInput').placeholder = 'Type word ' + (cliStepPos + 1) + ' of ' + cliStepWords.length + '...';
      cliHideAnswer();
      $('cliToggleBtn').textContent = 'Show Answer';
      cliStepRenderSlots();
    } else if (cliStudyMode) {
      $('cliInput').disabled = true;
      $('cliInput').placeholder = 'Study mode — answer shown below';
      cliShowAnswer(cliCards[cliIdx]);
      $('cliToggleBtn').textContent = 'Show Answer';
      if ($('cliSlots')) $('cliSlots').style.display = 'none';
    } else {
      $('cliInput').disabled = false;
      $('cliInput').placeholder = 'Type command here...';
      cliHideAnswer();
      $('cliToggleBtn').textContent = 'Show Answer';
      if ($('cliSlots')) $('cliSlots').style.display = 'none';
    }
  }

  function initCLI() {
    if (!ready || loadFailed) return;
    cliCards = allCards.filter(function (c) { return c.asset_type === 'CLOZE_SYNTAX'; }).sort(function () { return Math.random() - 0.5; });
    cliIdx = 0;
    $('cliTotal').textContent = cliCards.length + ' CLI cards';
    showCliCard();
  }
  $('cliShuffleBtn').addEventListener('click', function () { shuffle(cliCards); cliIdx = 0; showCliCard(); });

  function showCliCard() {
    if (cliCards.length === 0 || cliIdx >= cliCards.length) cliIdx = 0;
    if (cliCards.length === 0) { $('cliBody').innerHTML = '<div class="empty-state">No CLI cards available</div>'; return; }
    var c = cliCards[cliIdx];
    $('cliIdx').textContent = (cliIdx + 1) + ' / ' + cliCards.length;
    var prompt = getClozePrompt(c).replace(/<br\s*\/?>/gi, '\n');
    $('cliPrompt').textContent = prompt;
    var cmd = cliRenderCmd(c, false);
    var pm = cmd.match(/^[^\s]+\s*[#>]/);
    $('cliPrefix').textContent = pm ? pm[0] : 'R1#';
    $('cliInput').value = '';
    $('cliFeedback').textContent = ''; $('cliFeedback').className = 'cli-feedback';
    $('cliToggleBtn').textContent = 'Show Answer';
    if (cliStepMode) cliStepReset(c);
    applyCliMode();
  }
  $('cliNextBtn').addEventListener('click', function () { cliIdx++; showCliCard(); });
  $('cliPrevBtn').addEventListener('click', function () { if (cliIdx > 0) { cliIdx--; showCliCard(); } });
  $('cliToggleBtn').addEventListener('click', function () {
    var c = cliCards[cliIdx]; if (!c) return;
    if (this.textContent === 'Show Answer') {
      cliShowAnswer(c);
      this.textContent = 'Hide Answer';
    } else {
      cliHideAnswer();
      this.textContent = 'Show Answer';
    }
  });
  $('cliStudyBtn').addEventListener('click', function () {
    if (cliStepMode) { cliStepMode = false; $('cliStepBtn').classList.remove('active'); $('cliStepBtn').textContent = '👣 Step Mode'; }
    cliStudyMode = !cliStudyMode;
    this.classList.toggle('active', cliStudyMode);
    this.textContent = cliStudyMode ? '✍ Practice Mode' : '📖 Study Mode';
    applyCliMode();
  });
  $('cliStepBtn').addEventListener('click', function () {
    if (cliStudyMode) { cliStudyMode = false; $('cliStudyBtn').classList.remove('active'); $('cliStudyBtn').textContent = '📖 Study Mode'; }
    cliStepMode = !cliStepMode;
    this.classList.toggle('active', cliStepMode);
    this.textContent = cliStepMode ? '⚡ Quick Practice' : '👣 Step Mode';
    var c = cliCards[cliIdx];
    if (cliStepMode && c) cliStepReset(c);
    applyCliMode();
  });
  function cliStepCheck() {
    var c = cliCards[cliIdx]; if (!c) return;
    var input = $('cliInput').value.trim();
    if (!input) { $('cliInput').focus(); return; }
    var pos = cliStepNextUndone();
    if (pos < 0) { applyCliMode(); return; }
    var w = cliStepWords[pos];
    if (input.toLowerCase() === w.toLowerCase()) {
      cliStepDone[pos] = true;
      $('cliFeedback').textContent = '✓ Word correct! ' + (pos + 1) + ' of ' + cliStepWords.length;
      $('cliFeedback').className = 'cli-feedback cli-correct';
      $('cliInput').value = '';
      var nxt = cliStepNextUndone();
      if (nxt < 0) {
        cliStepPos = cliStepWords.length;
        $('cliSlots').innerHTML = '<div class="cli-slot-label">✓ <strong>Complete!</strong> You typed the full command.</div>' +
          cliStepWords.map(function (x) { return '<span class="cli-slot done">' + esc(x) + '</span>'; }).join('');
        cliShowAnswer(c);
        $('cliInput').disabled = true;
        $('cliFeedback').textContent = '✓ Full command correct!';
        $('cliFeedback').className = 'cli-feedback cli-correct';
        addXp(2);
        return;
      }
      cliStepPos = nxt;
      applyCliMode();
      $('cliInput').focus();
    } else {
      $('cliFeedback').textContent = '✗ Not quite. Word ' + (pos + 1) + ' starts with \u201c' + w.charAt(0).toUpperCase() + '\u201d (' + w.length + ' letters).';
      $('cliFeedback').className = 'cli-feedback cli-wrong';
      $('cliInput').select();
    }
  }
  $('cliInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && cliStepMode && !this.disabled) {
      e.preventDefault();
      cliStepCheck();
    }
  });
  $('cliHelpBtn').addEventListener('click', function () {
    var h = $('cliHelp'); if (!h) return;
    h.style.display = h.style.display === 'none' ? 'block' : 'none';
  });
  $('cliHintBtn').addEventListener('click', function () {
    var c = cliCards[cliIdx]; if (!c) return;
    var input = $('cliInput');
    var cmd = cliRenderCmd(c, false);
    var parts = cmd.replace(/^\S+\s*[#>]\s*/, '').split(/\s+/).filter(Boolean);
    var hint;
    if (parts.length > 1) hint = 'First word: ' + parts[0] + ' · ' + parts.length + ' part' + (parts.length === 1 ? '' : 's') + ' total';
    else hint = 'Type the command: ' + parts[0];
    $('cliFeedback').textContent = '💡 ' + hint;
    $('cliFeedback').className = 'cli-feedback cli-hint';
    if (input && !input.disabled) input.focus();
  });

  function cliRenderSuggest() {
    var box = $('cliSuggest');
    if (!box || $('cliInput').disabled || cliStepMode) { if (box) box.style.display = 'none'; return; }
    var v = $('cliInput').value.trim().toLowerCase();
    if (!v) { box.style.display = 'none'; return; }
    var cur = cliCards[cliIdx];
    var curCmd = cur ? cliRenderCmd(cur, false).toLowerCase() : '';
    var hits = [];
    for (var i = 0; i < cliCards.length && hits.length < 6; i++) {
      var c2 = cliClean(cliCards[i]);
      var lc = c2.toLowerCase();
      var isCur = cur && curCmd && lc === curCmd;
      var tokenHits = lc.split(/\s+/).filter(function (t) { return t.startsWith(v); }).length;
      if (tokenHits > 0 && !isCur) hits.push({ cmd: c2, rank: tokenHits * 10 - i / 100 });
      else if (lc.startsWith(v) && !isCur) hits.push({ cmd: c2, rank: 1 - i / 1000 });
    }
    hits.sort(function (a, b) { return b.rank - a.rank; });
    if (!hits.length) { box.style.display = 'none'; return; }
    box.innerHTML = hits.map(function (h) {
      return '<button class="cli-suggest-item" type="button" data-cmd="' + esc(h.cmd) + '">' + esc(h.cmd) + '</button>';
    }).join('');
    box.style.display = 'block';
    box.querySelectorAll('.cli-suggest-item').forEach(function (b) {
      b.addEventListener('click', function () {
        $('cliInput').value = b.dataset.cmd;
        $('cliSuggest').style.display = 'none';
        $('cliInput').focus();
      });
    });
  }
  $('cliInput').addEventListener('input', cliRenderSuggest);

  function renderCliList() {
    var q = ($('cliListSearch').value || '').toLowerCase().trim();
    var items = [];
    for (var i = 0; i < cliCards.length; i++) {
      var cmd = cliClean(cliCards[i]);
      if (q && cmd.toLowerCase().indexOf(q) === -1) continue;
      items.push({ i: i, cmd: cmd });
    }
    var shown = Math.min(cliListShown, items.length);
    $('cliListBody').innerHTML = items.slice(0, shown).map(function (it) {
      return '<button class="cli-list-item" data-i="' + it.i + '" type="button">' + esc(it.cmd) + '</button>';
    }).join('') || '<div class="empty-state">No commands match</div>';
    $('cliListMore').style.display = items.length > shown ? 'inline-block' : 'none';
  }
  $('cliListBtn').addEventListener('click', function () {
    var p = $('cliListPanel'); if (!p) return;
    p.style.display = p.style.display === 'none' ? 'block' : 'none';
    if (p.style.display === 'block') renderCliList();
  });
  $('cliListSearch').addEventListener('input', function () { cliListShown = 50; renderCliList(); });
  $('cliListMore').addEventListener('click', function () { cliListShown += 50; renderCliList(); });
  $('cliListBody').addEventListener('click', function (e) {
    var btn = e.target.closest('.cli-list-item');
    if (!btn) return;
    cliIdx = parseInt(btn.dataset.i, 10);
    $('cliListPanel').style.display = 'none';
    showCliCard();
    $('cliInput').focus();
  });

  $('cliInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && cliStepMode) return; // handled by step-mode listener
    if (e.key === 'Enter') {
      e.preventDefault();
      var s = $('cliSuggest'); if (s) s.style.display = 'none';
      var c = cliCards[cliIdx]; if (!c) return;
      var input = this.value.trim().toLowerCase();
      var cleaned = cliRenderCmd(c, false).toLowerCase();
      var tokens = getClozeAnswer(c).map(function (t) { return t.toLowerCase(); });
      var tokenMatch = tokens.some(function (t) { return t && input === t; });
      var prefixOk = input.length >= 3 && cleaned.indexOf(input) === 0;
      var tokenPrefixOk = tokens.some(function (t) { return t && t.length >= 3 && t.indexOf(input) === 0; });
      if (input === cleaned.trim() || tokenMatch || (cleaned.includes(input) && input.length > 5) || prefixOk || tokenPrefixOk) {
        $('cliFeedback').textContent = '✓ Correct!'; $('cliFeedback').className = 'cli-feedback cli-correct';
        $('cliAnswer').textContent = cliRenderCmd(c, false); $('cliAnswer').style.display = 'block'; this.disabled = true;
        if (getExplain(c)) { $('cliExplanation').textContent = getExplain(c); $('cliExplanation').style.display = 'block'; }
        addXp(1);
      } else {
        $('cliFeedback').textContent = '✗ Not quite. Try again or click "Show Answer"'; $('cliFeedback').className = 'cli-feedback cli-wrong';
        this.select();
      }
    }
  });

  // ===== EXAM MODE =====
  var exQueue = [], exIdx = 0, exCorrect = 0, exTimer = null, exTimeLeft = 0, exAnswers = [];

  function startExam() {
    if (!ready || loadFailed) return;
    var count = parseInt($('exCount').value) || 20;
    var time = parseInt($('exTime').value) || 60;
    var domain = $('exDomain').value;
    var pool = allCards.filter(function (c) { return c.asset_type !== 'CLOZE_SYNTAX'; });
    if (domain) pool = pool.filter(function (c) { return c.domain === domain; });
    shuffle(pool);
    exQueue = pool.slice(0, count);
    if (exQueue.length < 5) { $('exCard').innerHTML = '<div class="empty-state">Not enough cards. Select a broader filter.</div>'; return; }
    exIdx = 0; exCorrect = 0; exAnswers = []; exTimeLeft = time * 60;
    $('exSetup').style.display = 'none'; $('exArea').style.display = 'block'; $('exResult').style.display = 'none';
    $('exFinishBtn').style.display = 'none'; $('exNextBtn').style.display = 'inline-block';
    showExCard();
    if (exTimer) clearInterval(exTimer);
    exTimer = setInterval(function () {
      exTimeLeft--;
      var m = Math.floor(exTimeLeft / 60), s = exTimeLeft % 60;
      $('exTimer').textContent = m + ':' + (s < 10 ? '0' : '') + s;
      if (exTimeLeft <= 0) { clearInterval(exTimer); finishExam(); }
    }, 1000);
  }

  function showExGradeButtons(c) {
    var nav = $('exNextBtn').parentNode;
    var row = $('exGrade');
    if (!row) {
      row = document.createElement('div');
      row.id = 'exGrade';
      row.className = 'ex-grade';
      nav.insertBefore(row, $('exNextBtn'));
    }
    row.style.display = 'flex';
    row.innerHTML = '<span class="ex-grade-label">Did you know it?</span>' +
      '<button class="action-btn ex-grade-yes" type="button">✓ Knew it</button>' +
      '<button class="action-btn ex-grade-no" type="button">✗ Didn\'t know</button>';
    row.querySelector('.ex-grade-yes').addEventListener('click', function () {
      exCorrect++; exAnswers.push({ c: c, correct: true });
      addXp(3);
      row.style.display = 'none'; $('exNextBtn').style.display = 'inline-block';
    });
    row.querySelector('.ex-grade-no').addEventListener('click', function () {
      exAnswers.push({ c: c, correct: false });
      row.style.display = 'none'; $('exNextBtn').style.display = 'inline-block';
    });
  }

  function showExCard() {
    if (exIdx >= exQueue.length) { finishExam(); return; }
    var c = exQueue[exIdx];
    $('exIdx').textContent = (exIdx + 1) + ' / ' + exQueue.length;
    $('exBarFill').style.width = ((exIdx) / exQueue.length * 100) + '%';
    $('exCard').innerHTML = '<div class="ssn-type-badge">' + esc(TYPE_LABELS[c.asset_type] || c.asset_type || 'Card') + '</div>' + renderCard(c);
    bindSpeakButtons($('exCard'));
    var g = $('exGrade'); if (g) g.style.display = 'none';
    $('exNextBtn').style.display = 'none';
    bindCardEvents($('exCard'), c);
    var t = c.asset_type;
    if (t === 'FLASHCARD') {
      var fc = $('exCard').querySelector('.fc-card');
      if (fc) fc.addEventListener('click', function () {
        fc.classList.toggle('flipped');
        if (fc.classList.contains('flipped')) showExGradeButtons(c);
      });
    } else if (t === 'DISCRIMINATION') {
      var graded = false;
      var discOpts = $('exCard').querySelectorAll('.disc-opt');
      for (var di = 0; di < discOpts.length; di++) {
        discOpts[di].addEventListener('click', function () {
          if (graded || this.dataset.graded) return;
          var wrap = this.parentElement;
          if (wrap.dataset.multi === '1') {
            this.classList.toggle('disc-sel');
          } else {
            for (var dk = 0; dk < discOpts.length; dk++) discOpts[dk].classList.remove('disc-sel');
            this.classList.add('disc-sel');
            graded = true;
            var ok = gradeDisc($('exCard'));
            exAnswers.push({ c: c, correct: ok });
            if (ok) exCorrect++;
            $('exNextBtn').style.display = 'inline-block';
          }
        });
      }
      var dcb = $('exCard').querySelector('.disc-check-btn');
      if (dcb) dcb.addEventListener('click', function () {
        if (graded) return;
        graded = true;
        var ok = gradeDisc($('exCard'));
        exAnswers.push({ c: c, correct: ok });
        if (ok) exCorrect++;
        $('exNextBtn').style.display = 'inline-block';
      });
    } else if (t === 'ORDERING') {
      var ob = $('exCard').querySelector('.ord-check-btn');
      if (ob) ob.addEventListener('click', function () {
        var list = $('exCard').querySelector('.ord-list');
        var userOrder = Array.prototype.map.call(list.querySelectorAll('.ord-item'), function (d) { return d.textContent.replace(/^☰ /, ''); });
        var correct = getOrderSeq(c);
        var match = userOrder.length === correct.length && userOrder.every(function (v, i) { return v === correct[i]; });
        if (match) { exCorrect++; exAnswers.push({ c: c, correct: true }); } else { exAnswers.push({ c: c, correct: false }); }
        var ans = $('exCard').querySelector('.ord-answer');
        if (ans) ans.style.display = 'block';
        $('exNextBtn').style.display = 'inline-block';
      });
    } else if (t === 'TROUBLESHOOTING') {
      var rb = $('exCard').querySelector('.ts-reveal-btn');
      if (rb) rb.addEventListener('click', function () {
        var a = $('exCard').querySelector('.ts-answer');
        if (a) a.style.display = 'block';
        rb.style.display = 'none';
        showExGradeButtons(c);
      });
    } else {
      showExGradeButtons(c);
    }
    $('exNextBtn').onclick = function () { exIdx++; showExCard(); };
  }

  function finishExam() {
    if (exTimer) clearInterval(exTimer);
    invalidateSm2Stats();
    $('exArea').style.display = 'block'; $('exResult').style.display = 'block'; $('exFinishBtn').style.display = 'none'; $('exNextBtn').style.display = 'none';
    var pct = Math.round(exCorrect / exQueue.length * 100);
    var grade = pct >= 85 ? 'PASS' : 'FAIL';
    $('exStats').innerHTML = '<div class="ex-stat">Score: ' + exCorrect + '/' + exQueue.length + ' (' + pct + '%)</div>' +
      '<div class="ex-stat" style="color:' + (pct >= 85 ? 'var(--success)' : 'var(--error)') + ';font-size:1.4rem;font-weight:700">' + grade + '</div>';
    $('exReview').innerHTML = '<h4>Review</h4>' + exAnswers.map(function (a, i) {
      return '<div class="ex-review-item ' + (a.correct ? 'ex-r-correct' : 'ex-r-wrong') + '">' +
        '<span>' + (i + 1) + '. ' + (a.correct ? '✓' : '✗') + '</span> ' + esc(getQ(a.c)) + '</div>';
    }).join('');
  }
  $('exStartBtn').addEventListener('click', startExam);
  $('exRestart').addEventListener('click', function () { $('exSetup').style.display = 'block'; $('exArea').style.display = 'none'; $('exResult').style.display = 'none'; });

  // ===== DIAGNOSIS TABLES =====
  var diagCache = null;
  var diagCopyN = 0;
  function buildDiag() {
    var rows = [];
    allCards.forEach(function (c) {
      if (c.asset_type === 'TROUBLESHOOTING') {
        rows.push({ kind: 'ts', domain: c.domain || 'General', topic: c.topic || '', problem: getTroubSymptom(c) || getQ(c), fix: getTroubRes(c) || getTroubRoot(c) || '', steps: c.troubleshooting_steps || [] });
      } else if (c.asset_type === 'CLOZE_SYNTAX') {
        rows.push({ kind: 'cli', domain: c.domain || 'General', topic: c.topic || '', command: cliRenderCmd(c, false), desc: getExplain(c) || getClozePrompt(c) || '' });
      }
    });
    return rows;
  }
  function diagCmdFromSteps(steps) {
    for (var i = 0; i < steps.length; i++) {
      var m = /(show|debug|ping|traceroute|trace|sh)\s+[\w\-\.\/\*\+\?\s]+/i.exec(steps[i]);
      if (m) return m[0].trim();
    }
    return '';
  }
  function diagCopyBtn(cmdText) {
    var id = 'cp_' + (diagCopyN++);
    return '<span class="diag-cmd-cell"><code class="diag-code">' + esc(cmdText) + '</code>' +
      '<button class="diag-copy-btn" id="' + id + '" type="button" data-cmd="' + esc(cmdText) + '" aria-label="Copy command">⧉</button></span>';
  }
  function wireDiagCopy() {
    var btns = document.querySelectorAll('.diag-copy-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var text = this.dataset.cmd;
        if (!text) return;
        flashDiagCopy(this);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).catch(function () {});
        } else {
          var ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try { document.execCommand('copy'); } catch (e) {}
          document.body.removeChild(ta);
        }
      });
    }
  }
  function flashDiagCopy(btn) {
    var orig = btn.textContent;
    btn.textContent = '✓';
    btn.classList.add('copied');
    setTimeout(function () { btn.textContent = orig; btn.classList.remove('copied'); }, 1200);
  }
  function renderDiag() {
    if (!ready) { if ($('diagLoading')) $('diagLoading').style.display = 'block'; return; }
    if ($('diagLoading')) $('diagLoading').style.display = 'none';
    if (!diagCache) diagCache = buildDiag();
    var topicSel = $('diagTopic');
    if (topicSel && !topicSel.options.length) {
      var doms = uniq(diagCache.map(function (r) { return r.domain; }).filter(Boolean)).sort();
      topicSel.innerHTML = '<option value="all">All topics</option>' + doms.map(function (d) { return '<option value="' + esc(d) + '">' + esc(d) + '</option>'; }).join('');
    }
    var q = ($('diagSearch').value || '').toLowerCase().trim();
    var hideCmd = $('diagModeBtn').classList.contains('active');
    var topic = topicSel ? topicSel.value : 'all';
    var rows = diagCache.filter(function (r) {
      if (topic !== 'all' && (r.domain || '') !== topic) return false;
      if (!q) return true;
      var hay = (r.problem || '') + ' ' + (r.fix || '') + ' ' + (r.command || '') + ' ' + (r.desc || '') + ' ' + (r.topic || '');
      return hay.toLowerCase().indexOf(q) >= 0;
    });
    var byDom = {};
    rows.forEach(function (r) { (byDom[r.domain] = byDom[r.domain] || []).push(r); });
    var doms = Object.keys(byDom).sort();
    var html = '';
    doms.forEach(function (dom) {
      var ts = byDom[dom].filter(function (r) { return r.kind === 'ts'; });
      var cli = byDom[dom].filter(function (r) { return r.kind === 'cli'; });
      if (ts.length) {
        html += '<h3 class="diag-domain">' + esc(dom) + ' — Troubleshooting</h3><div class="diag-table-wrap"><table class="diag-table"><thead><tr>' +
          '<th>Problem</th>' + (hideCmd ? '' : '<th>Show / Command</th>') + '<th>Fix</th></tr></thead><tbody>';
        ts.forEach(function (r) {
          var cmd = diagCmdFromSteps(r.steps);
          html += '<tr><td>' + esc(r.problem) + '</td>' + (hideCmd ? '' : '<td>' + (cmd ? diagCopyBtn(cmd) : '<span class="diag-cmd-cell"><code class="diag-code">—</code></span>') + '</td>') + '<td>' + esc(r.fix) + '</td></tr>';
        });
        html += '</tbody></table></div>';
      }
      if (cli.length) {
        html += '<h3 class="diag-domain">' + esc(dom) + ' — Commands</h3><div class="diag-table-wrap"><table class="diag-table"><thead><tr><th>Command</th><th>What it does</th></tr></thead><tbody>';
        cli.forEach(function (r) {
          html += '<tr><td>' + diagCopyBtn(r.command) + '</td><td>' + esc(r.desc) + cliHelpHtml(r.command) + '</td></tr>';
        });
        html += '</tbody></table></div>';
      }
    });
    $('diagContent').innerHTML = html || '<div class="empty-state"><div class="empty-icon">🔧</div><div class="empty-text">No matches</div><div class="empty-sub">Try a broader search term</div></div>';
    wireDiagCopy();
  }
  $('diagSearch').addEventListener('input', renderDiag);
  $('diagTopic').addEventListener('change', renderDiag);
  $('diagModeBtn').addEventListener('click', function () {
    this.classList.toggle('active');
    this.textContent = this.classList.contains('active') ? 'Show Commands' : 'Hide Commands';
    renderDiag();
  });

  // ===== DIAGNOSIS PRACTICE MODE =====
  var dpQueue = [], dpIdx = 0, dpRevealed = false;
  function diagPracticeRows() {
    var topicSel = $('diagTopic');
    var topic = topicSel ? topicSel.value : 'all';
    var rows = diagCache.filter(function (r) { return topic === 'all' || (r.domain || '') === topic; });
    return rows;
  }
  function dpShowCard() {
    if (dpIdx >= dpQueue.length) { dpIdx = 0; dpShowCard(); return; }
    var r = dpQueue[dpIdx];
    $('dpIdx').textContent = dpIdx + 1; $('dpTotal').textContent = dpQueue.length;
    $('dpBar').style.width = ((dpIdx) / dpQueue.length * 100) + '%';
    dpRevealed = false;
    var html = '<div class="ssn-type-badge">' + (r.kind === 'ts' ? 'Troubleshooting' : 'Command') + '</div>';
    if (r.kind === 'ts') {
      html += '<div class="dp-problem"><div class="dp-label">Problem</div>' + esc(r.problem) + '</div>';
      if (r.command) html += '<div class="dp-answer" style="display:none"><div class="dp-label">Show / Command</div><code class="diag-code">' + esc(r.command) + '</code></div>';
      if (r.fix) html += '<div class="dp-answer" style="display:none"><div class="dp-label">Fix</div>' + esc(r.fix) + '</div>';
    } else {
      html += '<div class="dp-problem"><div class="dp-label">What does this command do?</div><code class="diag-code">' + esc(r.command) + '</code></div>' +
        '<div class="dp-answer" style="display:none"><div class="dp-label">Explanation</div>' + esc(r.desc) + cliHelpHtml(r.command) + '</div>';
    }
    $('dpCard').innerHTML = html;
    $('dpRevealBtn').style.display = 'inline-block';
    $('dpPrevBtn').disabled = dpIdx === 0;
  }
  $('diagPracticeBtn').addEventListener('click', function () {
    if (!diagCache) diagCache = buildDiag();
    dpQueue = diagPracticeRows().slice();
    if (!dpQueue.length) { alert('No diagnosis rows for this topic.'); return; }
    dpIdx = 0;
    $('diagContent').style.display = 'none';
    $('diagPractice').style.display = 'block';
    dpShowCard();
  });
  $('dpRevealBtn').addEventListener('click', function () {
    var r = dpQueue[dpIdx]; if (!r) return;
    $('dpCard').querySelectorAll('.dp-answer').forEach(function (el) { el.style.display = 'block'; });
    this.style.display = 'none';
    addXp(1);
  });
  $('dpNextBtn').addEventListener('click', function () { dpIdx++; dpShowCard(); });
  $('dpPrevBtn').addEventListener('click', function () { if (dpIdx > 0) { dpIdx--; dpShowCard(); } });
  $('dpExitBtn').addEventListener('click', function () {
    $('diagPractice').style.display = 'none';
    $('diagContent').style.display = 'block';
  });

  // ===== SM-2 DASHBOARD (merged into root Dashboard tab) =====
  var sm2StatsCache = null, sm2StatsCachedAt = 0;
  function computeSm2Stats() {
    var total = allCards.length;
    var due = allCards.filter(isDue).length;
    var mastered = allCards.filter(function (c) { var s = getSm2(c); return s.rep >= 3 && s.ef >= 2.0; }).length;
    return { due: due, studied: todayStudied(), streak: streakDays(), masteredPct: total ? Math.round(mastered / total * 100) : 0, total: total };
  }
  function getSm2StatsCached() {
    var now = Date.now();
    if (!sm2StatsCache || now - sm2StatsCachedAt > 60000) {
      sm2StatsCache = computeSm2Stats(); sm2StatsCachedAt = now;
    }
    return sm2StatsCache;
  }
  function invalidateSm2Stats() { sm2StatsCache = null; }

  var sm2ShowAllFlag = false;
  var sm2MasteryHidden = false;
  var SM2_DOMAIN_GROUPS = [
    [/BGP|EGP/, 'BGP'],
    [/OSPF/, 'OSPF'],
    [/EIGRP/, 'EIGRP'],
    [/STP|Spanning|Switching|VLAN|EtherChannel|MST|MSTP/, 'Switching & STP'],
    [/Multicast/i, 'Multicast'],
    [/Routing|WAN|Packet Forwarding|SD-WAN|Router/, 'Routing & WAN'],
    [/^IPv4$/, 'IPv4'],
    [/IPv6|IPv4\/IPv6/, 'IPv6'],
    [/Wireless|WLAN/, 'Wireless'],
    [/IoT|Smart |Privacy|Sensor|Vehicular|Location|Green /i, 'IoT & Privacy'],
    [/Automation|Programm|Ansible|Python|Paramiko|Pexpect|NETCONF|RESTCONF|API|YAML|Jinja|Git|CI\/CD|TDD|Templates|Linux|Continuous|Data Formats|Developer|Source Control|Go$/, 'Automation & Programmability'],
    [/Cloud|Virtual|AWS|Overlay/, 'Cloud & Virtualization'],
    [/IP Services|NAT|QoS|Assurance|Monitoring|Services/, 'IP Services & QoS'],
    [/Security|Crypt|Crypto|Firewall|Intrusion|Malicious|Authentication|Transport|Incident|Threats|PKI|Public-Key|Symmetric|Access Control|VPN|Attacks/, 'Security & Crypto'],
    [/Architecture|Design|Fabric|SD-Access|Fundamentals|TCP\/IP|Networking|Troubleshooting|Industry Trends/, 'Architecture & Design'],
    [/Arista|Juniper|General|Cisco|Vendors/, 'Vendors & General']
  ];
  function sm2DomainGroup(domain) {
    for (var i = 0; i < SM2_DOMAIN_GROUPS.length; i++) {
      if (SM2_DOMAIN_GROUPS[i][0].test(domain)) return SM2_DOMAIN_GROUPS[i][1];
    }
    return 'Other';
  }
  function renderSm2Dashboard() {
    if (!ready) return;
    var total = allCards.length;
    var due = allCards.filter(isDue).length;
    var studied = todayStudied();
    var streak = streakDays();
    var mastered = allCards.filter(function (c) { var s = getSm2(c); return s.rep >= 3 && s.ef >= 2.0; }).length;
    if ($('sm2Hero')) $('sm2Hero').innerHTML = '';
    var domGroups = {};
    allCards.forEach(function (c) {
      if (!c.domain) return;
      var g = sm2DomainGroup(c.domain);
      domGroups[g] = domGroups[g] || { cards: [], count: 0, mastered: 0 };
      domGroups[g].cards.push(c);
    });
    var domRows = Object.keys(domGroups).map(function (g) {
      var group = domGroups[g];
      var masteredCount = group.cards.filter(function (c) { var s = getSm2(c); return s.rep >= 3 && s.ef >= 2.0; }).length;
      return { d: g, pct: Math.round(masteredCount / group.cards.length * 100) };
    }).sort(function (a, b) { return b.pct - a.pct; });
    var showAll = sm2ShowAllFlag;
    var visible = showAll ? domRows : domRows.slice(0, 10);
    var hidden = domRows.length - visible.length;
    $('sm2Mastery').innerHTML = '<div class="dash-sec-head"><h3 class="dash-sec-title">SM-2 Mastery by Domain <span class="dash-sec-count">' + domRows.length + '</span></h3>' +
      '<button class="trans-btn dash-more-btn" id="sm2CollapseBtn" type="button">' + (sm2MasteryHidden ? 'Show' : 'Hide') + '</button></div>' +
      (sm2MasteryHidden ? '' :
      '<div class="dash-bar-rows" id="sm2BarRows">' + visible.map(function (r) {
        return '<div class="dash-bar-row"><span class="dash-bar-label">' + esc(r.d) + '</span>' +
          '<div class="dash-bar-track"><div class="dash-bar-fill" style="width:' + r.pct + '%"></div></div>' +
          '<span class="dash-bar-pct">' + r.pct + '%</span></div>';
      }).join('') + '</div>' +
      (hidden > 0 ? '<button class="trans-btn dash-more-btn" id="sm2MoreBtn" type="button">' + (showAll ? 'Show less' : 'Show all ' + hidden + ' more') + '</button>' : ''));
    var collapseBtn = $('sm2CollapseBtn');
    if (collapseBtn) collapseBtn.addEventListener('click', function () {
      sm2MasteryHidden = !sm2MasteryHidden;
      renderSm2Dashboard();
    });
    var moreBtn = $('sm2MoreBtn');
    if (moreBtn) moreBtn.addEventListener('click', function () {
      sm2ShowAllFlag = !sm2ShowAllFlag;
      renderSm2Dashboard();
    });
    var weak = allCards.filter(function (c) { var s = getSm2(c); return s.rep > 0 && s.ef < 1.5; })
      .sort(function (a, b) { return (getSm2(a).ef || 2.5) - (getSm2(b).ef || 2.5); }).slice(0, 5);
    $('sm2Weak').innerHTML = weak.length ? '<h3 class="dash-sec-title">Weakest Topics</h3>' + weak.map(function (c) {
      return '<div class="dash-weak-item">' + esc(getQ(c)) + ' <span class="dash-weak-ef">EF ' + (getSm2(c).ef || 2.5).toFixed(2) + '</span></div>';
    }).join('') : '';
    var types = {};
    allCards.forEach(function (c) { var t = c.asset_type; types[t] = (types[t] || 0) + 1; });
    $('sm2Types').innerHTML = '<h3 class="dash-sec-title">Asset Types</h3><div class="dash-type-chips">' + Object.keys(types).map(function (t) {
      return '<span class="dash-type-chip">' + (TYPE_LABELS[t] || t) + ' <b>' + types[t] + '</b></span>';
    }).join('') + '</div>';
  }

  // ===== EXPORT / IMPORT / RESET =====
  $('exportBtn').addEventListener('click', function () {
    var data = {};
    for (var i = 0; i < allCards.length; i++) {
      var d = loadSm2(cardId(allCards[i]));
      if (d) data[cardId(allCards[i])] = d;
    }
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'active-recall-progress.json';
    a.click();
  });
  $('importBtn').addEventListener('click', function () { $('importFile').click(); });
  $('importFile').addEventListener('change', function (e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (ev) {
      try {
        var data = JSON.parse(ev.target.result);
        Object.keys(data).forEach(function (k) { saveSm2(k, data[k]); });
        invalidateSm2Stats();
        renderSm2Dashboard();
      } catch (err) { alert('Invalid file'); }
    };
    reader.readAsText(file);
  });
  $('resetBtn').addEventListener('click', function () {
    if (confirm('Reset all SM-2 progress? This cannot be undone.')) {
      for (var i = 0; i < allCards.length; i++) {
        localStorage.removeItem(sm2Key(cardId(allCards[i])));
      }
      invalidateSm2Stats();
      renderSm2Dashboard();
    }
  });

  // ===== TAB HOOK =====
  var whenReadyPromise = null;
  var loadFailed = false;

  function dataGate(tab) {
    var g = { study: 'ssnLoading', cli: 'cliLoading', rexam: 'exLoading' }[tab];
    var hide = { study: 'studySetup', rexam: 'exSetup' }[tab];
    if (loadFailed) {
      if (g && $(g)) $(g).style.display = 'none';
      if (tab === 'study') { var err = $('ssnError'); if (err) err.style.display = 'block'; }
      if (hide && $(hide)) $(hide).style.display = 'none';
      if (tab === 'study') $('studyArea').style.display = 'none';
      if (tab === 'rexam') $('exArea').style.display = 'none';
      if (tab === 'cli') { $('cliTerminal').style.display = 'none'; $('cliTotal').textContent = '0 CLI cards'; }
      return;
    }
    if (g && $(g)) $(g).style.display = 'block';
    if (hide && $(hide)) $(hide).style.display = 'none';
    if (tab === 'study') $('studyArea').style.display = 'none';
    if (tab === 'rexam') $('exArea').style.display = 'none';
    if (tab === 'cli') $('cliTerminal').style.display = 'none';
  }

  window.studyApp = {
    onTab: function (tab) {
      if (tab === 'study' || tab === 'cli' || tab === 'rexam') {
        if (!ready) { dataGate(tab); return; }
        var g = { study: 'ssnLoading', cli: 'cliLoading', rexam: 'exLoading' }[tab];
        if (g && $(g)) $(g).style.display = 'none';
        if (tab === 'study') {
          var err = $('ssnError'); if (err) err.style.display = 'none';
          $('studySetup').style.display = 'block';
        }
        if (tab === 'rexam') $('exSetup').style.display = 'block';
        if (tab === 'cli') $('cliTerminal').style.display = 'block';
      }
      if (tab === 'cli') initCLI();
      if (tab === 'dashboard') renderSm2Dashboard();
      if (tab === 'weak') {
        if (loadFailed) { if ($('weakLoading')) $('weakLoading').style.display = 'none'; $('weakList').innerHTML = '<div class="empty-state">Could not load study data. Check that <code>data/ccna_active_recall.json</code> is available.</div>'; }
        else renderWeak();
      }
      if (tab === 'diag') {
        if (loadFailed) { if ($('diagLoading')) $('diagLoading').style.display = 'none'; $('diagContent').innerHTML = '<div class="empty-state">Could not load study data. Check that <code>data/ccna_active_recall.json</code> is available.</div>'; }
        else renderDiag();
      }
    },
    get ready() { return ready; },
    getSm2Stats: function () { return getSm2StatsCached(); },
    getGame: getLevelInfo,
    addXp: addXp,
    getWeakCards: function () { return weakCards(); }
  };
  window.studyApp.whenReady = function () {
    if (!whenReadyPromise) {
      whenReadyPromise = loadData();
    }
    return whenReadyPromise;
  };

  // ===== INIT =====
  (async function init() {
    await window.studyApp.whenReady();
    populateWeakSetup();
    var active = document.querySelector('.tab.active');
    if (active) window.studyApp.onTab(active.dataset.tab);
})();


})();
