
      (function () {
        var pages = Array.prototype.slice.call(document.querySelectorAll('.page'));
        var navBtns = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
        var nav = document.getElementById('mainNav');
        var menuBtn = document.getElementById('menuBtn');
        var valid = pages.map(function (p) { return p.getAttribute('data-page'); });

        function show(id) {
          if (valid.indexOf(id) === -1) id = 'home';
          pages.forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-page') === id); });
          document.querySelectorAll('.main-nav [data-nav]').forEach(function (b) {
            if (b.getAttribute('data-nav') === id) { b.setAttribute('aria-current', 'page'); }
            else { b.removeAttribute('aria-current'); }
          });
          nav.classList.remove('open');
          menuBtn.setAttribute('aria-expanded', 'false');
          if (id === 'result') { animateBars(); }
          window.scrollTo(0, 0);
        }
        function animateBars() {
          document.querySelectorAll('.bar-fill').forEach(function (f) { f.style.width = '0'; });
          requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              document.querySelectorAll('.bar-fill').forEach(function (f) { f.style.width = f.getAttribute('data-w') + '%'; });
            });
          });
        }
        navBtns.forEach(function (b) {
          b.addEventListener('click', function () {
            var id = b.getAttribute('data-nav');
            if (('#' + id) !== window.location.hash) { history.pushState(null, '', '#' + id); }
            show(id);
          });
        });
        menuBtn.addEventListener('click', function () {
          var open = nav.classList.toggle('open');
          menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        window.addEventListener('hashchange', function () { show(window.location.hash.replace('#', '')); });
        show(window.location.hash.replace('#', '') || 'home');
      })();

      /* M4 correction (2026-11-18, founder review): hero image state.
         The CSS :has() rule hides the CSS placeholder as soon as src is set;
         this adds the .hero--has-image class on successful load for browsers
         without :has(). If the approved image fails to load, the slot reverts
         to the empty state (src and srcset removed, placeholder returns, no
         broken-image icon). Listeners are attached even in the empty state,
         so a src set later at runtime is covered too. */
      (function () {
        var hero = document.querySelector('.hero');
        var pic = document.querySelector('.hero-picture');
        if (!hero || !pic) return;
        var img = pic.querySelector('img');
        var src = pic.querySelector('source');
        function revert() {
          img.removeAttribute('src');
          if (src) src.removeAttribute('srcset');
          hero.classList.remove('hero--has-image');
        }
        function markLoaded() { hero.classList.add('hero--has-image'); }
        if (img.hasAttribute('src')) {
          if (img.complete) {
            if (img.naturalWidth > 0) markLoaded(); else revert();
          } else {
            img.addEventListener('load', markLoaded);
            img.addEventListener('error', revert);
          }
        } else {
          img.addEventListener('load', markLoaded);
          img.addEventListener('error', revert);
        }
      })();
    