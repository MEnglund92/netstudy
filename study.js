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

  // ===== CLI LAB =====
  var cliCards = [], cliIdx = 0, cliStudyMode = false, cliListShown = 50;

  function cliClean(c) { return cliRenderCmd(c, false); }
  function cliShowAnswer(c) {
    $('cliAnswer').textContent = cliRenderCmd(c, false); $('cliAnswer').style.display = 'block';
    if (getExplain(c)) { $('cliExplanation').textContent = getExplain(c); $('cliExplanation').style.display = 'block'; }
    else { $('cliExplanation').style.display = 'none'; }
  }
  function cliHideAnswer() { $('cliAnswer').style.display = 'none'; $('cliExplanation').style.display = 'none'; }
  function applyCliMode() {
    if (cliCards.length === 0) return;
    if (cliStudyMode) {
      $('cliInput').disabled = true;
      $('cliInput').placeholder = 'Study mode — answer shown below';
      cliShowAnswer(cliCards[cliIdx]);
      $('cliToggleBtn').textContent = 'Show Answer';
    } else {
      $('cliInput').disabled = false;
      $('cliInput').placeholder = 'Type command here...';
      cliHideAnswer();
      $('cliToggleBtn').textContent = 'Show Answer';
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
    cliStudyMode = !cliStudyMode;
    this.classList.toggle('active', cliStudyMode);
    this.textContent = cliStudyMode ? '✍ Practice Mode' : '📖 Study Mode';
    applyCliMode();
  });
  $('cliHelpBtn').addEventListener('click', function () {
    var h = $('cliHelp'); if (!h) return;
    h.style.display = h.style.display === 'none' ? 'block' : 'none';
  });

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
    if (e.key === 'Enter') {
      e.preventDefault();
      var c = cliCards[cliIdx]; if (!c) return;
      var input = this.value.trim().toLowerCase();
      var cleaned = cliRenderCmd(c, false).toLowerCase();
      var tokens = getClozeAnswer(c).map(function (t) { return t.toLowerCase(); });
      var tokenMatch = tokens.some(function (t) { return t && input === t; });
      if (input === cleaned.trim() || tokenMatch || (cleaned.includes(input) && input.length > 5)) {
        $('cliFeedback').textContent = '✓ Correct!'; $('cliFeedback').className = 'cli-feedback cli-correct';
        $('cliAnswer').textContent = cliRenderCmd(c, false); $('cliAnswer').style.display = 'block'; this.disabled = true;
        if (getExplain(c)) { $('cliExplanation').textContent = getExplain(c); $('cliExplanation').style.display = 'block'; }
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

  function renderSm2Dashboard() {
    if (!ready) return;
    var total = allCards.length;
    var due = allCards.filter(isDue).length;
    var studied = todayStudied();
    var streak = streakDays();
    var mastered = allCards.filter(function (c) { var s = getSm2(c); return s.rep >= 3 && s.ef >= 2.0; }).length;
    if ($('sm2Hero')) $('sm2Hero').innerHTML = '';
    var doms = uniq(allCards.map(function (c) { return c.domain; }).filter(Boolean)).sort();
    $('sm2Mastery').innerHTML = '<h3>SM-2 Mastery by Domain</h3>' + doms.map(function (d) {
      var cards = allCards.filter(function (c) { return c.domain === d; });
      var masteredCount = cards.filter(function (c) { var s = getSm2(c); return s.rep >= 3 && s.ef >= 2.0; }).length;
      var pct = Math.round(masteredCount / cards.length * 100);
      return '<div class="dash-bar-row"><span class="dash-bar-label">' + esc(d) + '</span>' +
        '<div class="dash-bar-track"><div class="dash-bar-fill" style="width:' + pct + '%"></div></div>' +
        '<span class="dash-bar-pct">' + pct + '%</span></div>';
    }).join('');
    var weak = allCards.filter(function (c) { var s = getSm2(c); return s.rep > 0 && s.ef < 1.5; })
      .sort(function (a, b) { return (getSm2(a).ef || 2.5) - (getSm2(b).ef || 2.5); }).slice(0, 5);
    $('sm2Weak').innerHTML = weak.length ? '<h3>Weakest Topics</h3>' + weak.map(function (c) {
      return '<div class="dash-weak-item">' + esc(getQ(c)) + ' <span class="dash-weak-ef">EF ' + (getSm2(c).ef || 2.5).toFixed(2) + '</span></div>';
    }).join('') : '';
    var types = {};
    allCards.forEach(function (c) { var t = c.asset_type; types[t] = (types[t] || 0) + 1; });
    $('sm2Types').innerHTML = '<h3>Asset Type Breakdown</h3>' + Object.keys(types).map(function (t) {
      return '<div class="dash-type-item"><span>' + (TYPE_LABELS[t] || t) + '</span><span>' + types[t] + '</span></div>';
    }).join('');
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
    },
    get ready() { return ready; },
    getSm2Stats: function () { return getSm2StatsCached(); }
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
    var active = document.querySelector('.tab.active');
    if (active) window.studyApp.onTab(active.dataset.tab);
})();


})();
