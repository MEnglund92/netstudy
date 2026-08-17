(function () {
  'use strict';

  // ===== NetStudy v3 Labs — Analyze / Evaluate / Create exercises =====
  // Modes: SubnetCalc (pure math), Matching, Scenario MCQ, Error Spot,
  //        Predict Output, Decision Scenario. All local & deterministic.
  // Exposes window.labsApp = { onTab(tabId), whenReady() }.

  var pool = [];
  var ready = false;
  var loadFailed = false;
  var currentMode = 'subnet';

  var MODES = [
    { key: 'subnet', label: 'Subnet Calc', icon: '&#129520;' },
    { key: 'matching', label: 'Matching', icon: '&#128279;' },
    { key: 'scenario', label: 'Scenario MCQ', icon: '&#129657;' },
    { key: 'error', label: 'Error Spot', icon: '&#128030;' },
    { key: 'predict', label: 'Predict Output', icon: '&#128302;' },
    { key: 'decision', label: 'Decision', icon: '&#127795;' },
    { key: 'behavior', label: 'Behavior', icon: '&#129504;' }
  ];

  function $(id) { return document.getElementById(id); }

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = (s === null || s === undefined) ? '' : String(s);
    return d.innerHTML;
  }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

  function byType(t) {
    return pool.filter(function (c) { return c.asset_type === t; });
  }

  function addXp(n) {
    try {
      if (window.studyApp && window.studyApp.addXp) window.studyApp.addXp(n);
    } catch (e) { /* noop */ }
  }

  function rateLab(id, mode, ok) {
    try {
      if (window.studyApp && window.studyApp.rateLab) {
        window.studyApp.rateLab(id, { mode: mode, id: id, ok: ok, latency: Date.now() - labStartAt });
      }
    } catch (e) { /* noop */ }
  }

  var labStartAt = Date.now();
  function labResetTimer() { labStartAt = Date.now(); }

  // ===== DATA LOAD =====
  function loadData() {
    var paths = ['data/ccna_practice_labs.json', '../data/ccna_practice_labs.json'];
    return paths.reduce(function (p, path) {
      return p.then(function () {
        if (pool.length) return;
        return fetch(path).then(function (r) { return r.json(); }).then(function (d) {
          if (Array.isArray(d) && d.length) pool = d;
        }).catch(function () { /* try next path */ });
      });
    }, Promise.resolve()).then(function () {
      if (!pool.length) loadFailed = true;
      ready = true;
    });
  }

  var whenReadyPromise = null;
  function whenReady() {
    if (!whenReadyPromise) whenReadyPromise = loadData();
    return whenReadyPromise;
  }

  // ===== RENDER HUB =====
  function renderHub() {
    var host = $('labsArea');
    if (!host) return;
    if (!ready) { whenReady().then(renderHub); return; }
    if (loadFailed) {
      host.innerHTML = '<div class="empty-state">Could not load lab exercises. Check that <code>data/ccna_practice_labs.json</code> is present.</div>';
      return;
    }
    host.innerHTML = modeButtonsHtml() + '<div id="labModeBody"></div>';
    bindModeButtons();
    switchMode(currentMode);
  }

  function modeButtonsHtml() {
    var h = '<div class="lab-mode-bar" role="tablist" aria-label="Lab modes">';
    for (var i = 0; i < MODES.length; i++) {
      var m = MODES[i];
      var cnt = countForMode(m.key);
      h += '<button type="button" class="lab-mode-btn" data-mode="' + m.key + '" role="tab" aria-selected="false">' +
        m.icon + ' ' + m.label + (cnt ? ' <span class="lab-count">' + cnt + '</span>' : '') + '</button>';
    }
    return h + '</div>';
  }

  function bindModeButtons() {
    var btns = document.querySelectorAll('.lab-mode-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        switchMode(this.dataset.mode);
      });
    }
  }

  function switchMode(key) {
    currentMode = key;
    var btns = document.querySelectorAll('.lab-mode-btn');
    for (var i = 0; i < btns.length; i++) {
      var sel = btns[i].dataset.mode === key;
      btns[i].classList.toggle('active', sel);
      btns[i].setAttribute('aria-selected', sel ? 'true' : 'false');
    }
    var body = $('labModeBody');
    if (!body) return;
    if (key === 'subnet') renderSubnet(body);
    else if (key === 'matching') renderMatching(body);
    else if (key === 'scenario') renderScenario(body);
    else if (key === 'error') renderError(body);
    else if (key === 'predict') renderPredict(body);
    else if (key === 'decision') renderDecision(body);
    else if (key === 'behavior') renderBehavior(body);
  }

  function countForMode(key) {
    if (key === 'matching') return byType('MATCHING').length;
    if (key === 'scenario') return byType('SCENARIO_MCQ').length;
    if (key === 'error') return byType('ERROR_SPOT').length;
    if (key === 'predict') return byType('PREDICT_OUTPUT').length;
    if (key === 'decision') return byType('DECISION_SCENARIO').length;
    return 0;
  }

  function empty(body, key) {
    body.innerHTML = '<div class="lab-card"><div class="empty-state">No ' + esc(key) + ' exercises yet.</div></div>';
  }

  // Card mode helper: shared pager state
  function cardPager(items, renderer) {
    var st = { idx: 0, items: items, render: renderer };
    st.next = function () {
      st.idx = (st.idx + 1) % st.items.length;
      st.render(st);
    };
    return st;
  }

  // ============================================================
  // 1) SUBNET CALC — pure math generator
  // ============================================================
  function ipToNum(a, b, c, d) { return (((a << 24) | (b << 16) | (c << 8) | d) >>> 0); }
  function numToIp(n) {
    return ((n >>> 24) & 255) + '.' + ((n >>> 16) & 255) + '.' + ((n >>> 8) & 255) + '.' + (n & 255);
  }
  function prefixToMask(p) {
    var m = (p === 0) ? 0 : ((0xFFFFFFFF << (32 - p)) >>> 0);
    return numToIp(m);
  }

  function subnetQuestion() {
    var prefix = randInt(16, 30);
    var a = randInt(10, 200);
    var b = randInt(0, 255);
    var c = randInt(0, 255);
    var d = randInt(0, 255);
    var ipVal = ipToNum(a, b, c, d);
    var hostBits = 32 - prefix;
    var maskNum = (prefix === 0) ? 0 : ((0xFFFFFFFF << hostBits) >>> 0);
    var netVal = (ipVal & maskNum) >>> 0;
    var bcastVal = (netVal | (~maskNum >>> 0)) >>> 0;
    var qtype = randInt(0, 3);
    var answer, prompt;
    if (qtype === 0) { answer = numToIp(netVal); prompt = 'What is the NETWORK address?'; }
    else if (qtype === 1) { answer = numToIp(bcastVal); prompt = 'What is the BROADCAST address?'; }
    else if (qtype === 2) {
      answer = String(Math.max(0, Math.pow(2, hostBits) - 2));
      prompt = 'How many USABLE host addresses are in this subnet?';
    }
    else { answer = numToIp((netVal + 1) >>> 0); prompt = 'What is the FIRST usable host address?'; }
    return {
      ip: numToIp(ipVal), prefix: prefix, mask: prefixToMask(prefix),
      net: numToIp(netVal), bcast: numToIp(bcastVal),
      usable: Math.max(0, Math.pow(2, hostBits) - 2),
      firstHost: numToIp((netVal + 1) >>> 0), lastHost: numToIp((bcastVal - 1) >>> 0),
      qtype: qtype, prompt: prompt, answer: answer
    };
  }

  function renderSubnet(body) {
    labResetTimer();
    var q = subnetQuestion();
    var h =
      '<div class="lab-card">' +
        '<div class="lab-card-head"><span class="lab-ico">&#129520;</span><span>Subnet Calculator</span>' +
          '<span class="lab-sub">' + esc(q.ip) + ' /' + q.prefix + ' &middot; mask ' + esc(q.mask) + '</span></div>' +
        '<div class="lab-question"><p>Given <strong>' + esc(q.ip) + ' /' + q.prefix + '</strong> (subnet mask ' + esc(q.mask) + ').</p>' +
          '<p><strong>' + esc(q.prompt) + '</strong></p></div>' +
        '<div class="lab-answer">' +
          '<input type="text" id="subnetInput" placeholder="e.g. 192.168.1.0 or 254" autocomplete="off" autocapitalize="off" spellcheck="false" />' +
          '<button type="button" class="action-btn primary" id="subnetCheck">Check</button>' +
          '<button type="button" class="lab-new-btn" id="subnetNew">Next &#8594;</button>' +
        '</div>' +
        '<div class="lab-feedback" id="subnetFeedback"></div>' +
      '</div>';
    body.innerHTML = h;

    function check() {
      var fb = $('subnetFeedback');
      var inp = $('subnetInput');
      if (!fb || !inp) return;
      var raw = inp.value.trim();
      if (!raw) { fb.textContent = 'Type an answer first.'; return; }
      var ok;
      if (q.qtype === 2) {
        ok = Number(raw.replace(/,/g, '')) === q.usable;
      } else {
        ok = raw.toLowerCase().trim() === q.answer.toLowerCase();
      }
      fb.innerHTML = ok
        ? '<div class="lab-fb good">&#10003; Correct &mdash; ' + esc(q.answer) + '</div>'
        : '<div class="lab-fb bad">&#10007; Not quite &mdash; the answer is <strong>' + esc(q.answer) + '</strong></div>';
      if (ok) addXp(2);
      rateLab(q.ip + '/' + q.prefix, 'subnet', ok);
    }
    $('subnetCheck').addEventListener('click', check);
    $('subnetNew').addEventListener('click', function () { renderSubnet(body); });
    $('subnetInput').addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
    $('subnetInput').focus();
  }

  // ============================================================
  // 2) MATCHING
  // ============================================================
  function renderMatching(body) {
    labResetTimer();
    var items = byType('MATCHING');
    if (!items.length) { empty(body, 'matching'); return; }
    var item = items[randInt(0, items.length - 1)];
    var chosen = shuffle(item.pairs.slice()).slice(0, Math.min(6, item.pairs.length));
    var defs = shuffle(chosen.map(function (p) { return p.definition; }));

    var h =
      '<div class="lab-card">' +
        '<div class="lab-card-head"><span class="lab-ico">&#128279;</span><span>Matching</span>' +
          '<span class="lab-sub">' + esc(item.topic || item.domain) + '</span></div>' +
        '<p class="lab-lead">' + esc(item.prompt || 'Match each term to its definition.') + '</p>' +
        '<div class="lab-match-wrap">' +
          '<div class="lab-match-col"><h4>Terms</h4><div class="lab-match-list" id="matchTerms">' +
            chosen.map(function (p, i) {
              return '<button type="button" class="lab-match-term" data-i="' + i + '">' + esc(p.term) + '</button>';
            }).join('') +
          '</div></div>' +
          '<div class="lab-match-col"><h4>Definitions</h4><div class="lab-match-list" id="matchDefs">' +
            defs.map(function (d, i) {
              return '<button type="button" class="lab-match-def" data-i="' + i + '">' + esc(d) + '</button>';
            }).join('') +
          '</div></div>' +
        '</div>' +
        '<div class="lab-feedback" id="matchFeedback">Matched: 0 / ' + chosen.length + '</div>' +
      '</div>';
    body.innerHTML = h;

    var termSel = null;
    var matched = 0;
    var fb = $('matchFeedback');

    function markMatch(termBtn, defBtn, termIdx, defIdx) {
      var isCorrect = chosen[termIdx].definition === defs[defIdx];
      if (isCorrect) {
        termBtn.classList.remove('selected');
        termBtn.classList.add('done');
        defBtn.classList.add('done');
        matched++;
        fb.textContent = 'Matched: ' + matched + ' / ' + chosen.length;
        if (matched === chosen.length) {
          fb.innerHTML = '<div class="lab-fb good">&#10003; All ' + chosen.length + ' matched correctly!</div>';
          addXp(5);
          rateLab(item.topic || item.domain, 'matching', true);
        }
      } else {
        fb.innerHTML = '<div class="lab-fb bad">&#10007; That pair is wrong &mdash; try again.</div>';
        defBtn.classList.add('wrong');
        setTimeout(function () { defBtn.classList.remove('wrong'); }, 400);
      }
    }

    var termBtns = body.querySelectorAll('.lab-match-term');
    for (var i = 0; i < termBtns.length; i++) {
      termBtns[i].addEventListener('click', function () {
        if (this.classList.contains('done')) return;
        for (var k = 0; k < termBtns.length; k++) termBtns[k].classList.remove('selected');
        this.classList.add('selected');
        termSel = this;
      });
    }
    var defBtns = body.querySelectorAll('.lab-match-def');
    for (var j = 0; j < defBtns.length; j++) {
      defBtns[j].addEventListener('click', function () {
        if (!termSel || this.classList.contains('done')) return;
        markMatch(termSel, this, parseInt(termSel.dataset.i, 10), parseInt(this.dataset.i, 10));
      });
    }
  }

  // ============================================================
  // 3) SCENARIO MCQ
  // ============================================================
  function renderScenario(body) {
    var items = byType('SCENARIO_MCQ');
    if (!items.length) { empty(body, 'scenario'); return; }
    var pager = cardPager(items, function (st) { renderScCard(body, st); });
    pager.render(pager);
  }

  function renderScCard(body, st) {
    labResetTimer();
    var c = st.items[st.idx];
    var choices = shuffle(c.choices.slice());
    var h =
      '<div class="lab-card">' +
        '<div class="lab-card-head"><span class="lab-ico">&#129657;</span><span>Scenario MCQ</span>' +
          '<span class="lab-sub">' + esc(c.topic || c.domain) + '</span></div>' +
        '<div class="lab-progress">Scenario ' + (st.idx + 1) + ' / ' + st.items.length + '</div>' +
        '<div class="lab-scenario"><strong>Scenario:</strong> ' + esc(c.stimulus) + '</div>' +
        '<div class="lab-question">' + esc(c.question || 'What is the most likely cause?') + '</div>' +
        '<div class="lab-choices">' + choices.map(function (ch, i) {
          return '<button type="button" class="lab-choice" data-i="' + i + '">' + esc(ch.label) + '</button>';
        }).join('') + '</div>' +
        '<div class="lab-feedback" id="scFb"></div>' +
        '<div class="lab-nav"><button type="button" class="action-btn" id="scNext" disabled>Next &#8594;</button></div>' +
      '</div>';
    body.innerHTML = h;

    var answered = false;
    var btns = body.querySelectorAll('.lab-choice');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        if (answered) return;
        answered = true;
        var choice = choices[parseInt(this.dataset.i, 10)];
        for (var k = 0; k < btns.length; k++) {
          var ch = choices[parseInt(btns[k].dataset.i, 10)];
          btns[k].classList.add(ch.is_correct ? 'correct' : 'dim');
        }
        var fb = $('scFb');
        fb.innerHTML = (choice.is_correct ? '<div class="lab-fb good">&#10003; Correct</div>' : '<div class="lab-fb bad">&#10007; Incorrect</div>') +
          (c.explanation ? '<div class="lab-explain">' + esc(c.explanation) + '</div>' : '');
        if (choice.is_correct) addXp(3);
        rateLab(c.topic || c.domain, 'scenario', choice.is_correct);
        $('scNext').disabled = false;
      });
    }
    $('scNext').addEventListener('click', st.next);
  }

  // ============================================================
  // 4) ERROR SPOT
  // ============================================================
  var STOPWORDS = { the: 1, and: 1, that: 1, this: 1, with: 1, from: 1, were: 1, into: 1, each: 1, when: 1, which: 1, every: 1, after: 1, there: 1, would: 1, their: 1, other: 1, where: 1, because: 1, missing: 1, statement: 1, required: 1, everything: 1, dropped: 1, nothing: 1, single: 1, alone: 1, permit: 1, address: 1, addresses: 1, network: 1, config: 1, router: 1, line: 1 };

  function flawTokens(flaw, min) {
    var seen = {};
    var toks = [];
    var words = String(flaw).toLowerCase().split(/[^a-z0-9\-]+/);
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (w.length >= min && !STOPWORDS[w] && !seen[w]) { seen[w] = 1; toks.push(w); }
    }
    return toks;
  }

  function flawLiterals(flaw) {
    var toks = [];
    var quoted = String(flaw).match(/`([^`]+)`/g) || [];
    for (var i = 0; i < quoted.length; i++) toks.push(quoted[i].replace(/`/g, ''));
    return toks;
  }

  function allFlawTokens(flaws) {
    var toks = [];
    for (var i = 0; i < flaws.length; i++) {
      var t = flawTokens(flaws[i], 4);
      for (var k = 0; k < t.length; k++) toks.push(t[k]);
      var l = flawLiterals(flaws[i]);
      for (var m = 0; m < l.length; m++) toks.push(l[m]);
    }
    return toks;
  }

  function guiltyLines(code, flaws) {
    var lines = code.split('\n');
    var tokens = allFlawTokens(flaws);
    var guilty = [];
    for (var j = 0; j < lines.length; j++) {
      var lower = lines[j].toLowerCase();
      var hit = tokens.some(function (t) {
        return t && lower.indexOf(String(t).toLowerCase()) > -1;
      });
      if (hit) guilty.push(j);
    }
    return guilty;
  }

  function renderError(body) {
    var items = byType('ERROR_SPOT');
    if (!items.length) { empty(body, 'error'); return; }
    var pager = cardPager(items, function (st) { renderErrCard(body, st); });
    pager.render(pager);
  }

  function renderErrCard(body, st) {
    labResetTimer();
    var c = st.items[st.idx];
    var lines = c.code.split('\n');
    var guilty = (c.bad_lines && c.bad_lines.length) ? c.bad_lines.slice() : guiltyLines(c.code, c.flaws);

    var h =
      '<div class="lab-card">' +
        '<div class="lab-card-head"><span class="lab-ico">&#128030;</span><span>Spot the Error</span>' +
          '<span class="lab-sub">' + esc(c.title || c.topic) + '</span></div>' +
        '<div class="lab-progress">Exercise ' + (st.idx + 1) + ' / ' + st.items.length + '</div>' +
        '<pre class="lab-code" id="errCode">' +
          lines.map(function (line, i) {
            return '<div class="lab-code-line" data-i="' + i + '"><span class="lab-ln">' +
              String(i + 1).padStart(3, '0') + '</span> ' + esc(line) + '</div>';
          }).join('') +
        '</pre>' +
        '<div class="lab-question">Select the line(s) that contain the error, then press Check.</div>' +
        '<div class="lab-nav">' +
          '<button type="button" class="action-btn primary" id="errCheck">Check</button>' +
          '<button type="button" class="lab-new-btn" id="errNext">Next &#8594;</button>' +
        '</div>' +
        '<div class="lab-feedback" id="errFb"></div>' +
      '</div>';
    body.innerHTML = h;

    var selected = {};
    var lineEls = body.querySelectorAll('.lab-code-line');
    for (var i = 0; i < lineEls.length; i++) {
      lineEls[i].addEventListener('click', function () {
        var li = this.dataset.i;
        if (this.classList.contains('checked')) return;
        if (this.classList.toggle('selected')) selected[li] = true;
        else delete selected[li];
      });
    }

    $('errCheck').addEventListener('click', function () {
      var fb = $('errFb');
      if (!Object.keys(selected).length) { fb.textContent = 'Select at least one line first.'; return; }
      var found = 0;
      for (var k = 0; k < lineEls.length; k++) {
        var el = lineEls[k];
        el.classList.add('checked');
        var gi = parseInt(el.dataset.i, 10);
        if (guilty.indexOf(gi) > -1) {
          el.classList.add('guilty');
          if (selected[gi]) found++;
        }
      }
      if (!guilty.length) {
        fb.innerHTML = '<div class="lab-fb bad">Could not auto-grade this one &mdash; review the explanation and the highlighted lines.</div>' +
          '<div class="lab-explain">' + esc(c.explanation) + '</div>';
        addXp(1);
        rateLab(c.title || c.topic, 'error', false);
        return;
      }
      var picked = Object.keys(selected).length;
      var allFound = found === guilty.length && picked === guilty.length;
      fb.innerHTML =
        (allFound
          ? '<div class="lab-fb good">&#10003; You found all ' + guilty.length + ' flawed line(s).</div>'
          : '<div class="lab-fb bad">&#10007; You found ' + found + ' of ' + guilty.length + ' flawed line(s) &mdash; highlighted below.</div>') +
        '<div class="lab-explain">' + esc(c.explanation) + '</div>';
      if (allFound) addXp(4); else if (found > 0) addXp(1);
      rateLab(c.title || c.topic, 'error', allFound);
    });
    $('errNext').addEventListener('click', st.next);
  }

  // ============================================================
  // 5) PREDICT OUTPUT
  // ============================================================
  function renderPredict(body) {
    var items = byType('PREDICT_OUTPUT');
    if (!items.length) { empty(body, 'predict'); return; }
    var pager = cardPager(items, function (st) { renderPredCard(body, st); });
    pager.render(pager);
  }

  function renderPredCard(body, st) {
    labResetTimer();
    var c = st.items[st.idx];
    var choices = shuffle(c.choices.slice());
    var h =
      '<div class="lab-card">' +
        '<div class="lab-card-head"><span class="lab-ico">&#128302;</span><span>Predict Output</span>' +
          '<span class="lab-sub">' + esc(c.topic || c.domain) + '</span></div>' +
        '<div class="lab-progress">Command ' + (st.idx + 1) + ' / ' + st.items.length + '</div>' +
        (c.setup ? '<div class="lab-scenario"><strong>Setup:</strong> ' + esc(c.setup) + '</div>' : '') +
        '<div class="lab-command"><code>' + esc(c.command) + '</code></div>' +
        '<div class="lab-question">' + esc(c.question || 'What output do you expect?') + '</div>' +
        '<div class="lab-choices">' + choices.map(function (ch, i) {
          return '<button type="button" class="lab-choice" data-i="' + i + '"><pre class="lab-choice-pre">' + esc(ch.label) + '</pre></button>';
        }).join('') + '</div>' +
        '<div class="lab-feedback" id="prFb"></div>' +
        '<div class="lab-nav"><button type="button" class="action-btn" id="prNext" disabled>Next &#8594;</button></div>' +
      '</div>';
    body.innerHTML = h;

    var answered = false;
    var btns = body.querySelectorAll('.lab-choice');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        if (answered) return;
        answered = true;
        var choice = choices[parseInt(this.dataset.i, 10)];
        for (var k = 0; k < btns.length; k++) {
          var ch = choices[parseInt(btns[k].dataset.i, 10)];
          btns[k].classList.add(ch.is_correct ? 'correct' : 'dim');
        }
        var fb = $('prFb');
        fb.innerHTML = (choice.is_correct ? '<div class="lab-fb good">&#10003; Correct</div>' : '<div class="lab-fb bad">&#10007; Incorrect</div>') +
          '<div class="lab-expected"><strong>Expected output:</strong><pre>' + esc(c.expected_output) + '</pre></div>' +
          (c.explanation ? '<div class="lab-explain">' + esc(c.explanation) + '</div>' : '');
        if (choice.is_correct) addXp(3);
        rateLab(c.command || c.topic, 'predict', choice.is_correct);
        $('prNext').disabled = false;
      });
    }
    $('prNext').addEventListener('click', st.next);
  }

  // ============================================================
  // 6) DECISION SCENARIO
  // ============================================================
  function renderDecision(body) {
    var items = byType('DECISION_SCENARIO');
    if (!items.length) { empty(body, 'decision'); return; }
    var pager = cardPager(items, function (st) { renderDecFlow(body, st, null); });
    pager.render(pager);
  }

  function renderDecFlow(body, st, nodeId) {
    if (!nodeId) labResetTimer();
    var c = st.items[st.idx];
    var nodes = c.nodes;
    var id = nodeId || ('start' in nodes ? 'start' : Object.keys(nodes)[0]);
    var node = nodes[id];
    if (!node) { st.next(); return; }
    var isEnd = !!node.is_end;

    var h =
      '<div class="lab-card">' +
        '<div class="lab-card-head"><span class="lab-ico">&#127795;</span><span>Decision Scenario</span>' +
          '<span class="lab-sub">' + esc(c.topic || c.title) + '</span></div>' +
        '<div class="lab-progress">Scenario ' + (st.idx + 1) + ' / ' + st.items.length + '</div>' +
        (id === 'start' && c.intro ? '<div class="lab-scenario"><strong>Incident:</strong> ' + esc(c.intro) + '</div>' : '') +
        '<div class="lab-question">' + esc(node.text) + '</div>';
    if (isEnd) {
      var good = node.outcome === 'success';
      h += '<div class="lab-fb ' + (good ? 'good' : 'bad') + '">' +
        (good ? '&#10003; Outcome handled.' : '&#10007; The incident is not fully resolved.') + '</div>' +
        '<div class="lab-explain">' + esc(c.explanation || '') + '</div>' +
        '<div class="lab-nav"><button type="button" class="action-btn" id="decNext">Next Scenario &#8594;</button></div>';
      body.innerHTML = h;
      $('decNext').addEventListener('click', st.next);
      if (good) addXp(5);
      rateLab(c.topic || c.title, 'decision', good);
      return;
    }
    h += '<div class="lab-choices">' + node.choices.map(function (ch, i) {
      return '<button type="button" class="lab-choice" data-i="' + i + '">' + esc(ch.label) + '</button>';
    }).join('') + '</div>';
    body.innerHTML = h;
    var btns = body.querySelectorAll('.lab-choice');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var choice = node.choices[parseInt(this.dataset.i, 10)];
        renderDecFlow(body, st, choice.next);
      });
    }
  }

  // ============================================================
  // 7) BEHAVIOR — BIAS_DIALOG, DECEPTION_AUDIT, CUE_SCRUBBER.
  //    Content lives in data/behavioral_*.json; all grading is deterministic.
  // ============================================================
  var BEHAVIOR_FAMILIES = [
    { key: 'BIAS_DIALOG', file: 'data/behavioral_bias_dialog.json', icon: '&#129504;', label: 'Bias Dialog', desc: 'A conversation where an assistant shows bias &mdash; pinpoint the biased turn and the bias type (sycophancy, confirmation bias, anchoring, authority, framing&hellip;).' },
    { key: 'DECEPTION_AUDIT', file: 'data/behavioral_deception_audit.json', icon: '&#128274;', label: 'Deception Audit', desc: 'A text (email, config, chat output, log) containing deceptive elements &mdash; flag each marker (injection, hidden instruction, fabricated fact, social engineering&hellip;).' },
    { key: 'CUE_SCRUBBER', file: 'data/behavioral_cue_scrubber.json', icon: '&#128269;', label: 'Cue Scrubber', desc: 'A prompt that leaks the answer through a cue &mdash; identify the leak and the clean version (embedded answer, leading wording, pattern hint&hellip;).' }
  ];

  var BIAS_TYPES = ['sycophancy', 'confirmation_bias', 'anchoring', 'authority_bias', 'recency_bias', 'availability_heuristic', 'social_proof', 'framing'];
  var CUE_TYPES = ['embedded_answer', 'leading_wording', 'pattern_hint', 'semantic_leak', 'length_cue', 'position_cue'];

  var behaviorData = {};
  var behaviorLoading = null;

  function loadBehavior() {
    if (!behaviorLoading) {
      behaviorLoading = BEHAVIOR_FAMILIES.reduce(function (p, f) {
        return p.then(function () {
          return fetch(f.file).then(function (r) { return r.json(); }).then(function (d) {
            behaviorData[f.key] = Array.isArray(d) ? d : [];
          }).catch(function () { behaviorData[f.key] = []; });
        });
      }, Promise.resolve());
    }
    return behaviorLoading;
  }

  function pickOptions(list, correct, n) {
    var rest = list.filter(function (t) { return t !== correct; });
    shuffle(rest);
    var out = [correct].concat(rest.slice(0, n - 1));
    return shuffle(out);
  }

  function renderBehavior(body) {
    loadBehavior().then(function () {
      if (!body || body !== $('labModeBody')) return;
      var h =
        '<div class="lab-card">' +
          '<div class="lab-card-head"><span class="lab-ico">&#129504;</span><span>Behavioral Science</span>' +
            '<span class="lab-sub">bias &middot; deception &middot; cue hygiene</span></div>' +
          '<p class="lab-lead">Exercises about how wording, bias and deception shape technical decisions. Pick a family to start &mdash; every card is graded automatically.</p>' +
          '<div class="lab-behavior-grid">';
      for (var i = 0; i < BEHAVIOR_FAMILIES.length; i++) {
        var f = BEHAVIOR_FAMILIES[i];
        var cnt = (behaviorData[f.key] || []).length;
        h += '<button type="button" class="lab-behavior-card lab-behavior-start" data-key="' + f.key + '">' +
          '<span class="lab-behavior-head"><span class="lab-behavior-ico">' + f.icon + '</span><span class="lab-behavior-title">' + f.label + '</span>' +
          '<span class="lab-count">' + cnt + (cnt === 1 ? ' exercise' : ' exercises') + '</span></span>' +
          '<span class="lab-behavior-desc">' + f.desc + '</span>' +
          '<span class="lab-behavior-src"><code>' + esc(f.file) + '</code></span></button>';
      }
      h += '</div></div>';
      body.innerHTML = h;
      var cards = body.querySelectorAll('.lab-behavior-start');
      for (var k = 0; k < cards.length; k++) {
        cards[k].addEventListener('click', function () {
          var key = this.dataset.key;
          var items = behaviorData[key] || [];
          if (!items.length) return;
          var pager = cardPager(items, function (st) { renderBehaviorCard(body, st, key); });
          pager.render(pager);
        });
      }
    });
  }

  function renderBehaviorCard(body, st, key) {
    labResetTimer();
    var c = st.items[st.idx];
    if (key === 'BIAS_DIALOG') renderBias(body, st, c);
    else if (key === 'DECEPTION_AUDIT') renderAudit(body, st, c);
    else renderScrub(body, st, c);
  }

  function renderBias(body, st, c) {
    var phase = 'turn';
    var h =
      '<div class="lab-card">' +
        '<div class="lab-card-head"><span class="lab-ico">&#129504;</span><span>Bias Dialog</span>' +
          '<span class="lab-sub">' + esc(c.title) + '</span></div>' +
        '<div class="lab-progress">Exercise ' + (st.idx + 1) + ' / ' + st.items.length +
          ' &middot; <button type="button" class="lab-link" id="biasBack">All families</button></div>' +
        '<div class="lab-scenario"><strong>Scenario:</strong> ' + esc(c.scenario) + '</div>' +
        '<div class="lab-dialog" id="biasTurns"></div>' +
        '<div class="lab-question">Select the turn where the assistant shows bias, then press Check.</div>' +
        '<div class="lab-feedback" id="biasFb"></div>' +
        '<div class="lab-nav">' +
          '<button type="button" class="action-btn primary" id="biasCheck">Check</button>' +
          '<button type="button" class="lab-new-btn" id="biasNext">Next &#8594;</button>' +
        '</div>' +
      '</div>';
    body.innerHTML = h;
    $('biasBack').addEventListener('click', function () { renderBehavior(body); });
    $('biasNext').addEventListener('click', st.next);
    var turnsHost = $('biasTurns');
    var turnEls = (c.turns || []).map(function (t, i) {
      var el = document.createElement('div');
      el.className = 'lab-turn ' + (t.speaker === 'user' ? 'user' : 'assistant');
      el.innerHTML = '<span class="lab-turn-who">' + esc(t.speaker) + '</span><span class="lab-turn-text">' + esc(t.text) + '</span>';
      el.addEventListener('click', function () {
        if (phase !== 'turn') return;
        var was = el.classList.contains('selected');
        var sel = turnsHost.querySelectorAll('.lab-turn.selected');
        for (var s = 0; s < sel.length; s++) sel[s].classList.remove('selected');
        if (!was) el.classList.add('selected');
      });
      return el;
    });
    for (var t0 = 0; t0 < turnEls.length; t0++) turnsHost.appendChild(turnEls[t0]);

    $('biasCheck').addEventListener('click', function () {
      var fb = $('biasFb');
      if (phase !== 'turn') return;
      var sel = turnsHost.querySelectorAll('.lab-turn.selected');
      if (!sel.length) { fb.textContent = 'Select the biased turn first.'; return; }
      var picked = turnEls.indexOf(sel[0]);
      if (picked !== c.biased_turn) {
        phase = 'done';
        fb.innerHTML = '<div class="lab-fb bad">&#10007; Turn ' + (picked + 1) + ' is not the biased one &mdash; the bias is in turn ' + (c.biased_turn + 1) + '.</div>' +
          '<div class="lab-explain">' + esc(c.explanation) + '</div>';
        addXp(1);
        rateLab(c.id || c.title, 'behavior', false);
        return;
      }
      turnEls[c.biased_turn].classList.add('guilty');
      phase = 'type';
      var types = pickOptions(BIAS_TYPES, c.bias_type, 4);
      fb.innerHTML = '<div class="lab-fb good">&#10003; Correct turn. Now pick the bias type:</div>' +
        '<div class="lab-choices" id="biasTypes">' + types.map(function (t, i) {
          return '<button type="button" class="lab-choice" data-i="' + i + '">' + esc(t) + '</button>';
        }).join('') + '</div>';
      var btns = fb.querySelectorAll('.lab-choice');
      for (var b = 0; b < btns.length; b++) {
        btns[b].addEventListener('click', function () {
          phase = 'done';
          var pickedType = types[parseInt(this.dataset.i, 10)];
          var okType = pickedType === c.bias_type;
          fb.innerHTML = (okType
            ? '<div class="lab-fb good">&#10003; Correct &mdash; ' + esc(c.bias_type) + '.</div>'
            : '<div class="lab-fb bad">&#10007; That is ' + esc(pickedType) + ' &mdash; the bias here is ' + esc(c.bias_type) + '.</div>') +
            '<div class="lab-explain">' + esc(c.explanation) + '</div>';
          if (okType) addXp(4); else addXp(1);
          rateLab(c.id || c.title, 'behavior', okType);
        });
      }
    });
  }

  function auditDecoys(documentText, snippetTexts) {
    var sentences = String(documentText).split('. ').map(function (s) { return s.trim(); }).filter(function (s) { return s.length > 8; });
    var decoys = [];
    for (var i = 0; i < sentences.length && decoys.length < 2; i++) {
      var s = sentences[i];
      var overlaps = snippetTexts.some(function (sn) { return s.indexOf(sn) > -1 || sn.indexOf(s) > -1; });
      if (!overlaps && decoys.indexOf(s) < 0) decoys.push(s);
    }
    return decoys;
  }

  function renderAudit(body, st, c) {
    var markers = c.markers || [];
    var snippetTexts = markers.map(function (m) { return m.snippet; });
    var candidates = shuffle(snippetTexts.concat(auditDecoys(c.document, snippetTexts)));
    var correctSet = {};
    snippetTexts.forEach(function (s) { correctSet[s] = 1; });
    var h =
      '<div class="lab-card">' +
        '<div class="lab-card-head"><span class="lab-ico">&#128274;</span><span>Deception Audit</span>' +
          '<span class="lab-sub">' + esc(c.title) + '</span></div>' +
        '<div class="lab-progress">Audit ' + (st.idx + 1) + ' / ' + st.items.length +
          ' &middot; <button type="button" class="lab-link" id="auditBack">All families</button></div>' +
        '<div class="lab-scenario lab-scenario-doc"><strong>Document:</strong><br>' + esc(c.document) + '</div>' +
        '<div class="lab-question">Select every deceptive element in the document (not the harmless ones), then press Check.</div>' +
        '<div class="lab-choices lab-choices-wrap" id="auditCands">' + candidates.map(function (s, i) {
          return '<button type="button" class="lab-choice" data-i="' + i + '">' + esc(s) + '</button>';
        }).join('') + '</div>' +
        '<div class="lab-feedback" id="auditFb"></div>' +
        '<div class="lab-nav">' +
          '<button type="button" class="action-btn primary" id="auditCheck">Check</button>' +
          '<button type="button" class="lab-new-btn" id="auditNext">Next &#8594;</button>' +
        '</div>' +
      '</div>';
    body.innerHTML = h;
    $('auditBack').addEventListener('click', function () { renderBehavior(body); });
    $('auditNext').addEventListener('click', st.next);
    var picked = {};
    var btns = body.querySelectorAll('.lab-choice');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        if (this.classList.contains('checked')) return;
        if (this.classList.toggle('selected')) picked[this.dataset.i] = true;
        else delete picked[this.dataset.i];
      });
    }
    $('auditCheck').addEventListener('click', function () {
      var fb = $('auditFb');
      var selKeys = Object.keys(picked).map(function (k) { return parseInt(k, 10); });
      if (!selKeys.length) { fb.textContent = 'Select at least one element first.'; return; }
      var found = 0, falsePos = 0;
      for (var j = 0; j < candidates.length; j++) {
        var el = btns[j];
        el.classList.add('checked');
        if (correctSet[candidates[j]]) {
          el.classList.add('guilty');
          if (picked[j]) found++;
        } else if (picked[j]) falsePos++;
      }
      var ok = found === snippetTexts.length && falsePos === 0;
      fb.innerHTML = (ok
        ? '<div class="lab-fb good">&#10003; You flagged all ' + snippetTexts.length + ' deceptive element(s) with no false positives.</div>'
        : '<div class="lab-fb bad">&#10007; ' + found + ' of ' + snippetTexts.length + ' flagged' + (falsePos ? ', plus ' + falsePos + ' harmless one(s)' : '') + ' &mdash; highlighted below.</div>') +
        '<div class="lab-explain">' + esc(c.explanation) + '</div>';
      if (ok) addXp(4); else if (found) addXp(1);
      rateLab(c.id || c.title, 'behavior', ok);
    });
  }

  function renderScrub(body, st, c) {
    var types = pickOptions(CUE_TYPES, c.cue_type, 4);
    var h =
      '<div class="lab-card">' +
        '<div class="lab-card-head"><span class="lab-ico">&#128269;</span><span>Cue Scrubber</span>' +
          '<span class="lab-sub">' + esc(c.title) + '</span></div>' +
        '<div class="lab-progress">Exercise ' + (st.idx + 1) + ' / ' + st.items.length +
          ' &middot; <button type="button" class="lab-link" id="scrubBack">All families</button></div>' +
        '<div class="lab-scenario lab-scenario-doc"><strong>Prompt:</strong><br>' + esc(c.prompt) + '</div>' +
        '<div class="lab-question">Which cue leaks the answer in this prompt?</div>' +
        '<div class="lab-choices" id="scrubTypes">' + types.map(function (t, i) {
          return '<button type="button" class="lab-choice" data-i="' + i + '">' + esc(t) + '</button>';
        }).join('') + '</div>' +
        '<div class="lab-feedback" id="scrubFb"></div>' +
        '<div class="lab-nav"><button type="button" class="lab-new-btn" id="scrubNext">Next &#8594;</button></div>' +
      '</div>';
    body.innerHTML = h;
    $('scrubBack').addEventListener('click', function () { renderBehavior(body); });
    $('scrubNext').addEventListener('click', st.next);
    var btns = body.querySelectorAll('.lab-choice');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var picked = types[parseInt(this.dataset.i, 10)];
        var ok = picked === c.cue_type;
        var fb = $('scrubFb');
        fb.innerHTML = (ok
          ? '<div class="lab-fb good">&#10003; Correct &mdash; ' + esc(c.cue_type) + '.</div>'
          : '<div class="lab-fb bad">&#10007; That is ' + esc(picked) + ' &mdash; the leak here is ' + esc(c.cue_type) + '.</div>') +
          '<div class="lab-scenario lab-scenario-clean"><strong>Clean version:</strong><br>' + esc(c.clean_version) + '</div>' +
          '<div class="lab-explain">' + esc(c.explanation) + '</div>';
        if (ok) addXp(4); else addXp(1);
        rateLab(c.id || c.title, 'behavior', ok);
        for (var j = 0; j < btns.length; j++) {
          btns[j].classList.add('checked');
          if (types[j] === c.cue_type) btns[j].classList.add('guilty');
        }
      });
    }
  }

  // ===== PUBLIC =====
  window.labsApp = {
    onTab: function (tab) {
      if (tab !== 'labs') return;
      var host = $('labsArea');
      if (!host) return;
      if (!ready) {
        host.innerHTML = '<div class="empty-state">Loading exercises&hellip;</div>';
        whenReady().then(renderHub);
      } else {
        renderHub();
      }
    },
    whenReady: whenReady,
    ready: function () { return ready; }
  };

  if (window.studyApp && window.studyApp.whenReady) {
    window.studyApp.whenReady().then(function () {
      var btn = document.querySelector('.tab.active[data-tab="labs"]');
      if (btn) window.labsApp.onTab('labs');
    });
  }
})();