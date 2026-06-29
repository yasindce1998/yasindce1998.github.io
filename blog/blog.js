/* /dev/log blog — shared interactions (index + post pages).
   Theme is stored under the shared `theme` key so light/dark stay in sync with
   the portfolio. `cyber` is blog-only; the portfolio degrades to light. */
(function () {
  'use strict';

  var root = document.documentElement;
  var VALID = ['dark', 'light', 'cyber'];
  var THEME_COLORS = { dark: '#0c0b09', light: '#f3ecdc', cyber: '#02060a' };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Theme toggle (3-state) ---- */
  function setTheme(theme, animate) {
    if (VALID.indexOf(theme) === -1) theme = 'light';
    if (animate && !reduceMotion) {
      document.body.classList.add('theme-anim');
      setTimeout(function () { document.body.classList.remove('theme-anim'); }, 700);
    }
    root.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta && THEME_COLORS[theme]) meta.setAttribute('content', THEME_COLORS[theme]);
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.theme === theme);
    });
  }

  document.querySelectorAll('.theme-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { setTheme(btn.dataset.theme, true); });
  });

  // Sync toggle UI with the theme the inline head script already applied.
  setTheme(root.dataset.theme || 'light', false);

  // Keyboard: `t` cycles themes.
  document.addEventListener('keydown', function (e) {
    var tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === 't' || e.key === 'T') {
      var i = VALID.indexOf(root.dataset.theme);
      setTheme(VALID[(i + 1) % VALID.length], true);
    }
  });

  /* ---- Reading progress bar ---- */
  var bar = document.getElementById('progressBar');
  if (bar) {
    var updateProgress = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ---- Typewriter hero ---- */
  var typeEl = document.getElementById('typewriter');
  if (typeEl) {
    var phrases = [];
    try { phrases = JSON.parse(typeEl.dataset.words || '[]'); } catch (e) {}
    if (phrases.length) {
      if (reduceMotion) {
        typeEl.textContent = phrases[0];
      } else {
        var gIdx = 0, cIdx = 0, deleting = false;
        var tick = function () {
          var cur = phrases[gIdx];
          if (deleting) {
            cIdx--;
            typeEl.textContent = cur.slice(0, cIdx);
            if (cIdx === 0) {
              deleting = false;
              gIdx = (gIdx + 1) % phrases.length;
              setTimeout(tick, 400);
              return;
            }
            setTimeout(tick, 35);
          } else {
            cIdx++;
            typeEl.textContent = cur.slice(0, cIdx);
            if (cIdx === cur.length) {
              deleting = true;
              setTimeout(tick, 2200);
              return;
            }
            setTimeout(tick, 75 + Math.random() * 50);
          }
        };
        tick();
      }
    }
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.forEach(function (el) { el.classList.add('visible'); });
    } else {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
      reveals.forEach(function (el) { obs.observe(el); });
    }
  }

  /* ---- Hero mouse glow ---- */
  var glow = document.getElementById('mouseGlow');
  var hero = document.getElementById('hero');
  if (glow && hero && !reduceMotion) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      glow.style.left = (e.clientX - rect.left) + 'px';
      glow.style.top = (e.clientY - rect.top) + 'px';
      glow.style.opacity = '1';
    });
    hero.addEventListener('mouseleave', function () { glow.style.opacity = '0'; });
  }

  /* ---- Code windows: wrap <pre> in chrome + copy button ---- */
  document.querySelectorAll('.blog-post-content pre').forEach(function (pre) {
    if (pre.closest('.code-window')) return;

    var code = pre.querySelector('code');
    var lang = '';
    if (code) {
      var m = (code.className || '').match(/language-([\w-]+)/);
      if (m) lang = m[1];
    }

    var win = document.createElement('div');
    win.className = 'code-window';
    var header = document.createElement('div');
    header.className = 'code-header';
    header.innerHTML =
      '<span class="code-dots"><span></span><span></span><span></span></span>' +
      '<span class="code-lang">' + (lang || 'code') + '</span>';

    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.type = 'button';
    btn.textContent = 'copy';
    header.appendChild(btn);

    pre.parentNode.insertBefore(win, pre);
    win.appendChild(header);
    win.appendChild(pre);

    btn.addEventListener('click', function () {
      var text = (code || pre).innerText;
      var done = function () {
        btn.classList.add('copied');
        btn.textContent = 'copied';
        setTimeout(function () { btn.classList.remove('copied'); btn.textContent = 'copy'; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        done();
      }
    });
  });
})();
