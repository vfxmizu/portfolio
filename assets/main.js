(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---- mobile nav ---- */
  var toggle = $('.nav-toggle'), links = $('#nav-links');
  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
  });

  /* ---- video gallery ---- */
  var videos = (window.VIDEOS || []).slice();
  var grid = $('#video-grid'), filtersEl = $('#filters');
  var active = 'All';

  function isMp4(v) { return v.platform === 'mp4' || (!!v.src && !v.id); }
  function isPlaceholder(v) { if (isMp4(v)) return !v.src; return !v.id || /^YOUR_/i.test(v.id); }
  function thumbFor(v) {
    if (v.thumb) return v.thumb;
    if (v.platform === 'youtube' && !isPlaceholder(v)) return 'https://i.ytimg.com/vi/' + encodeURIComponent(v.id) + '/hqdefault.jpg';
    return '';
  }
  function embedUrl(v) {
    if (v.platform === 'vimeo') return 'https://player.vimeo.com/video/' + encodeURIComponent(v.id) + '?autoplay=1&dnt=1';
    return 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(v.id) + '?autoplay=1&rel=0';
  }
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }

  /* ---- sensitive content: blurred until the visitor clicks the card once (remembered per session) ---- */
  var REVEAL_KEY = 'mizu-revealed';
  function keyOf(v) { return (v.platform || 'mp4') + ':' + (v.src || v.id || v.title); }
  function loadRevealed() {
    try { var a = JSON.parse(sessionStorage.getItem(REVEAL_KEY) || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; }
  }
  var revealed = loadRevealed();
  function isSensitive(v) { return v.sensitive === true; }
  function isRevealed(v) { return !isSensitive(v) || revealed.indexOf(keyOf(v)) >= 0; }
  function markRevealed(v) {
    var k = keyOf(v);
    if (revealed.indexOf(k) < 0) revealed.push(k);
    try { sessionStorage.setItem(REVEAL_KEY, JSON.stringify(revealed)); } catch (e) {}
  }
  var live = el('div', 'sr-only'); live.setAttribute('role', 'status'); live.setAttribute('aria-live', 'polite');
  document.body.appendChild(live);
  var EYE = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3.2"/></svg>';
  function cardLabel(v, ph) {
    if (ph) return v.title + ' (placeholder, no video yet)';
    if (!isRevealed(v)) return 'Sensitive content: ' + v.title + '. Press to reveal the thumbnail';
    return 'Play video: ' + v.title + (isSensitive(v) ? ' (sensitive content)' : '');
  }

  function visible() { return videos.filter(function (v) { return active === 'All' || v.category === active; }); }

  function renderFilters() {
    var cats = ['All'];
    videos.forEach(function (v) { if (v.category && cats.indexOf(v.category) < 0) cats.push(v.category); });
    filtersEl.innerHTML = '';
    if (cats.length < 3) { filtersEl.hidden = true; return; }
    cats.forEach(function (c) {
      var b = el('button', 'filter', c);
      b.type = 'button'; b.setAttribute('aria-pressed', c === active);
      b.addEventListener('click', function () {
        active = c; renderFilters(); renderGrid();
      });
      filtersEl.appendChild(b);
    });
  }

  function renderGrid() {
    grid.innerHTML = '';
    var list = visible();
    grid.classList.toggle('all-vertical', list.length > 0 && list.every(function (v) { return v.vertical; }));
    list.forEach(function (v, i) {
      var ph = isPlaceholder(v);
      var card = el('button', 'vcard reveal' + (v.vertical ? ' vertical' : '') + (ph ? ' is-placeholder' : ''));
      card.type = 'button';
      card.style.setProperty('--d', (i % 3) * 0.08 + 's');
      card.setAttribute('aria-label', cardLabel(v, ph));
      if (isSensitive(v) && !ph) {
        card.classList.add('sensitive');
        if (isRevealed(v)) card.classList.add('revealed');
      }

      var t = el('div', 'vthumb');
      var src = thumbFor(v);
      if (src) {
        var img = new Image();
        img.loading = 'lazy'; img.decoding = 'async'; img.alt = '';
        img.src = src;
        img.addEventListener('error', function () { img.remove(); t.insertBefore(el('div', 'ph-art'), t.firstChild).appendChild(el('span', '', 'No thumbnail')); });
        t.appendChild(img);
      } else {
        var art = el('div', 'ph-art'); art.appendChild(el('span', '', ph ? 'Your video here' : v.category || 'Video'));
        t.appendChild(art);
      }
      if (ph) t.appendChild(el('span', 'badge ph', 'Placeholder'));
      t.appendChild(el('span', 'play'));
      if (isSensitive(v) && !ph) {
        var sb = el('span', 'sens-badge');
        sb.innerHTML = EYE;
        sb.appendChild(el('span', '', 'Click to reveal'));
        t.appendChild(sb);
      }
      card.appendChild(t);

      var m = el('div', 'vmeta');
      if (v.category) m.appendChild(el('span', 'vcat', v.category));
      m.appendChild(el('h3', '', v.title));
      if (v.note) m.appendChild(el('p', '', v.note));
      card.appendChild(m);

      if (!ph) card.addEventListener('click', function () {
        if (!isRevealed(v)) { // first click only reveals this card; it never opens the player
          markRevealed(v);
          card.classList.add('revealed');
          card.setAttribute('aria-label', cardLabel(v, false));
          live.textContent = 'Thumbnail revealed: ' + v.title + '. Press again to play.';
          return;
        }
        openModal(v, card);
      });
      grid.appendChild(card);
      observe(card);
    });
  }

  /* ---- modal (embed only loads on click) ---- */
  var modal = $('#modal'), frame = $('#modal-frame'), mtitle = $('#modal-title');
  var lastFocus = null, current = null;

  function playable() { return visible().filter(function (v) { return !isPlaceholder(v) && isRevealed(v); }); }
  function clearFrame() {
    var o = frame.querySelector('video');
    if (o) { o.pause(); o.removeAttribute('src'); o.load(); }
    frame.innerHTML = '';
  }
  function load(v) {
    if (!isRevealed(v)) return; // never show a sensitive video (or its poster) before it has been revealed
    current = v;
    clearFrame();
    frame.classList.toggle('vertical', !!v.vertical);
    if (isMp4(v)) {
      var vid = document.createElement('video');
      vid.controls = true; vid.setAttribute('playsinline', ''); vid.setAttribute('preload', 'none');
      vid.setAttribute('aria-label', v.title);
      if (v.thumb) vid.poster = v.thumb;
      vid.src = v.src;
      frame.appendChild(vid);
      var pr = vid.play(); if (pr && pr.catch) pr.catch(function () {});
    } else {
      var f = document.createElement('iframe');
      f.src = embedUrl(v); f.title = v.title;
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
      f.allowFullscreen = true;
      frame.appendChild(f);
    }
    mtitle.textContent = v.title;
    var many = playable().length > 1;
    $('#modal-prev').style.display = $('#modal-next').style.display = many ? '' : 'none';
  }
  function openModal(v, opener) {
    if (!isRevealed(v)) return;
    lastFocus = opener; load(v);
    modal.hidden = false; document.body.style.overflow = 'hidden';
    $('.modal-close').focus();
  }
  function closeModal() {
    modal.hidden = true; clearFrame(); current = null; document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function step(d) {
    var l = playable(); if (!l.length) return;
    var i = l.indexOf(current); load(l[(i + d + l.length) % l.length]);
  }
  modal.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close')) closeModal(); });
  $('#modal-prev').addEventListener('click', function () { step(-1); });
  $('#modal-next').addEventListener('click', function () { step(1); });
  document.addEventListener('keydown', function (e) {
    if (modal.hidden) return;
    if (e.key === 'Escape') closeModal();
    else if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'Tab') { // simple focus trap
      var f = modal.querySelectorAll('button:not([style*="display: none"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---- scroll reveal ---- */
  var io = null;
  if ('IntersectionObserver' in window && !reduce) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  }
  function observe(n) { if (io) io.observe(n); else n.classList.add('in'); }

  renderFilters(); renderGrid();
  document.querySelectorAll('.reveal').forEach(function (n, i) {
    if (!n.classList.contains('vcard')) { if (!n.style.getPropertyValue('--d')) n.style.setProperty('--d', (i % 4) * 0.06 + 's'); observe(n); }
  });

  /* ---- copy Discord ---- */
  var cb = $('#copy-discord'), st = $('#copy-status');
  cb.addEventListener('click', function () {
    var txt = cb.getAttribute('data-copy');
    var done = function (m) { st.textContent = m; setTimeout(function () { st.textContent = 'click to copy'; }, 2000); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(function () { done('copied!'); }, function () { done(txt); });
    else done(txt);
  });
})();
