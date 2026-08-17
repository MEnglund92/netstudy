(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };
  var CONCEPT_MAP = { course1: 'kurs1', course2: 'kurs2', course3: 'kurs4', course4: 'kurs3' };
  var audioIndex = null;

  function courses() { return (window.appData && window.appData.courses) ? window.appData.courses : []; }
  function currentCourse() {
    var sel = document.getElementById('courseSelect');
    return sel ? parseInt(sel.value, 10) : -1;
  }
  function conceptCount(course) {
    var cc = window.ccnaConcepts || {};
    var l = cc[course.id] || cc[CONCEPT_MAP[course.id]] || [];
    return Array.isArray(l) ? l.length : Object.keys(l).length;
  }
  function countTerms(course) { return course.entries ? course.entries.length : 0; }
  function countAudio(course) {
    if (!audioIndex || !course.entries) return 0;
    var n = 0;
    for (var i = 0; i < course.entries.length; i++) {
      if (audioIndex[course.entries[i].phrase]) n++;
    }
    return n;
  }
  function countResources(course) {
    var rd = (window.appStats && window.appStats.resourcesData) ? window.appStats.resourcesData : {};
    var n = 0;
    var m = /Course (\d+)/.exec(course.name);
    var kurs = m ? 'Kurs ' + m[1] : null;
    Object.keys(rd).forEach(function (k) {
      (rd[k] || []).forEach(function (r) {
        if (!r.course) return;
        if (kurs ? r.course === kurs : course.name.indexOf(r.course) === 0) n++;
      });
    });
    return n;
  }
  function courseCats(course) {
    var map = {};
    (course.categories || []).forEach(function (c) { map[c.id] = { name: c.name, count: 0 }; });
    (course.entries || []).forEach(function (e) { if (map[e.category]) map[e.category].count++; });
    return Object.keys(map).map(function (k) { return map[k]; }).sort(function (a, b) { return b.count - a.count; });
  }
  function resourcesTotal() {
    var rd = (window.appStats && window.appStats.resourcesData) ? window.appStats.resourcesData : {};
    return Object.keys(rd).reduce(function (a, k) { return a + (rd[k] || []).length; }, 0);
  }

  function libRow(label, value, max) {
    var pct = max ? Math.round(value / max * 100) : 0;
    return '<div class="rb-lib-row"><div class="rb-lib-head"><span class="rb-lib-label">' + label + '</span>' +
      '<span class="rb-lib-value">' + value + '</span></div>' +
      '<div class="rb-bar-wrap"><div class="rb-bar-fill" style="width:' + pct + '%"></div></div></div>';
  }

  function renderGame() {
    if (!window.studyApp || !window.studyApp.getGame) return;
    var g = window.studyApp.getGame();
    var lv = $('gameLevel'), xp = $('gameXp'), st = $('gameStreak'), bar = $('gameBar');
    if (lv) lv.textContent = g.level;
    if (xp) xp.textContent = g.xp + ' XP';
    if (st) st.textContent = g.streak + ' day' + (g.streak === 1 ? '' : 's');
    if (bar) bar.style.width = g.pct + '%';
  }

  function render() {
    var cs = courses();
    if (!cs.length) return;
    var sel = currentCourse();
    var recallTotal = (window.studyApp && window.studyApp.getSm2Stats) ? window.studyApp.getSm2Stats().total : 0;
    var resTotal = resourcesTotal();
    var termsTotal = cs.reduce(function (a, c) { return a + countTerms(c); }, 0);
    var cc = window.ccnaConcepts || {};
    var conceptsTotal = Object.keys(cc).reduce(function (a, k) {
      var v = cc[k];
      return a + (Array.isArray(v) ? v.length : 0);
    }, 0);
    var audioTotal = audioIndex ? Object.keys(audioIndex).length : 0;

    var side = $('sideSummary');
    if (side) {
      side.innerHTML =
        '<div class="side-sum-row"><span class="side-sum-label">Glossary terms</span><span class="side-sum-value">' + termsTotal + '</span></div>' +
        '<div class="side-sum-row"><span class="side-sum-label">Concepts</span><span class="side-sum-value">' + conceptsTotal + '</span></div>' +
        '<div class="side-sum-row"><span class="side-sum-label">Recall cards</span><span class="side-sum-value">' + recallTotal + '</span></div>' +
        '<div class="side-sum-row"><span class="side-sum-label">Audio files</span><span class="side-sum-value">' + audioTotal + '</span></div>' +
        '<div class="side-sum-row"><span class="side-sum-label">Resources</span><span class="side-sum-value">' + resTotal + '</span></div>';
    }

    var lib = $('rbLibrary');
    if (lib) {
      var max = Math.max(termsTotal, conceptsTotal, recallTotal, audioTotal, resTotal, 1);
      lib.innerHTML = libRow('Glossary terms', termsTotal, max) +
        libRow('Concepts', conceptsTotal, max) +
        libRow('Recall cards', recallTotal, max) +
        libRow('Audio files', audioTotal, max) +
        libRow('Resources', resTotal, max);
    }

    var crs = $('rbCourse');
    if (crs) {
      if (sel >= 0 && sel < cs.length) {
        var c = cs[sel];
        var t = countTerms(c), ct = conceptCount(c), au = countAudio(c), rs = countResources(c);
        var max2 = Math.max(t, ct, au, rs, 1);
        crs.innerHTML = libRow('Terms', t, max2) + libRow('Concepts', ct, max2) + libRow('Audio', au, max2) + libRow('Resources', rs, max2);
      } else {
        crs.innerHTML = '<div class="rb-empty">Select a course to see its content</div>';
      }
    }

    var cats = $('rbCats');
    if (cats) {
      var rows;
      if (sel >= 0 && sel < cs.length) {
        rows = courseCats(cs[sel]);
      } else {
        var agg = {};
        cs.forEach(function (c) { courseCats(c).forEach(function (r) { agg[r.name] = (agg[r.name] || 0) + r.count; }); });
        rows = Object.keys(agg).map(function (k) { return { name: k, count: agg[k] }; }).sort(function (a, b) { return b.count - a.count; });
      }
      cats.innerHTML = rows.length
        ? rows.map(function (r) {
            return '<button class="rb-cat-row" type="button" title="Browse ' + r.name + '">' +
              '<span class="rb-cat-name">' + r.name + '</span>' +
              '<span class="rb-cat-count">' + r.count + '</span></button>';
          }).join('')
        : '<div class="rb-empty">No categories</div>';
      var catBtns = cats.querySelectorAll('.rb-cat-row');
      for (var ci = 0; ci < catBtns.length; ci++) {
        catBtns[ci].addEventListener('click', function () {
          var name = this.querySelector('.rb-cat-name').textContent;
          if (window.appNav && window.appNav.goBrowseCategory) window.appNav.goBrowseCategory(name);
        });
      }
    }
    renderGame();
  }

  function loadAudio() {
    if (audioIndex !== null) return;
    fetch('data/audio/index.json').then(function (r) { return r.json(); }).then(function (j) {
      audioIndex = j || {};
      render();
    }).catch(function () { audioIndex = {}; });
  }

  function boot() {
    loadAudio();
    render();
    var tabs = document.querySelector('.tabs');
    if (tabs) tabs.addEventListener('click', function () { setTimeout(render, 80); });
    var sel = document.getElementById('courseSelect');
    if (sel) sel.addEventListener('change', function () { setTimeout(render, 80); });
    window.addEventListener('focus', function () { setTimeout(render, 120); });
    window.addEventListener('netstudy-game', function () { render(); });
    setInterval(render, 30000);
    if (window.studyApp && window.studyApp.whenReady) {
      window.studyApp.whenReady().then(function () { render(); });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
