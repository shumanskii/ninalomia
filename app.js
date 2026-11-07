(function () {
  var C = window.NINA || {};
  var REGIONS = {
    us: 'USA and Canada',
    uk: 'United Kingdom and Ireland',
    eu: 'Europe',
    other: 'Other countries'
  };
  var SHOPS = {
    us: 'Amazon, Etsy, Bookshop.org',
    uk: 'Amazon UK, Etsy, Bookshop.org',
    eu: 'Amazon, Etsy and local stores',
    other: 'stores that deliver to your country'
  };
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function validEmail(v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v); }
  function param(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return m ? decodeURIComponent(m[1]) : '';
  }
  function saveRegion(r) { try { localStorage.setItem('nina_region', r); } catch (e) {} }
  function loadRegion() { try { var r = localStorage.getItem('nina_region') || ''; return r === 'oceania' ? 'other' : r; } catch (e) { return ''; } }

  /* Social links */
  $$('[data-social]').forEach(function (a) {
    var url = (C.social || {})[a.getAttribute('data-social')];
    if (url) { a.setAttribute('href', url); a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); }
    else { a.setAttribute('href', '#'); a.addEventListener('click', function (e) { e.preventDefault(); }); }
  });

  /* Video */
  var play = $('[data-video]');
  var videoNote = $('[data-video-note]');
  if (play) {
    if (C.videoUrl && videoNote) { videoNote.hidden = true; }
    play.addEventListener('click', function () {
      if (C.videoUrl) { window.open(C.videoUrl, '_blank', 'noopener'); }
      else if (videoNote) { videoNote.hidden = false; }
    });
  }

  /* Access form: country + email */
  var access = $('[data-access]');
  if (access) {
    var MATERIALS = {
      mom: { eyebrow: 'For mothers', title: 'Phrases you shouldn’t say to your adult daughter', lead: 'Sometimes, even well-intentioned words can push your daughter further away. Discover which phrases may hurt your relationship, and what you can say instead to open the door to a better conversation.', btn: 'Get the free guide', perks: 'Free PDF · Real examples · What to say instead', cover: 'img/cover-mom.jpg' },
      daughter: { eyebrow: 'For daughters', title: 'Phrases that help you stand your ground with Mom', lead: 'When Mom criticizes you, makes you feel guilty, or won’t take no for an answer, you don’t have to keep defending yourself. Discover the words that set boundaries, without another painful argument.', btn: 'Get the free guide', perks: 'Free PDF · Ready-made replies · Calm, clear boundaries', cover: 'img/cover-daughter.jpg' },
      kopilka: { eyebrow: 'Nina’s Holiday Gift Guide', title: 'Gifts you can order in your country', lead: 'Stores and delivery differ from country to country. Tell us where you live and we’ll show a selection just for you.', btn: 'Open the gift guide' }
    };
    var m = param('m');
    if (!MATERIALS[m]) { m = 'kopilka'; }
    var info = MATERIALS[m];
    $('[data-access-eyebrow]').textContent = info.eyebrow;
    $('[data-access-title]').textContent = info.title;
    $('[data-access-lead]').textContent = info.lead;
    var perksEl = $('[data-access-perks]');
    if (perksEl) { if (info.perks) { perksEl.textContent = info.perks; } else { perksEl.hidden = true; } }
    var btn = $('button[type="submit"]', access);
    btn.textContent = info.btn;
    var coverEl = $('[data-cover]');
    if (coverEl && info.cover) {
      coverEl.addEventListener('load', function () { coverEl.hidden = false; });
      coverEl.setAttribute('alt', 'Cover of the guide: ' + info.title);
      coverEl.src = info.cover;
    }
    var sel = $('#acc-country');
    var email = $('#acc-email');
    var note = $('.form-note', access);
    var busy = false;
    function say(t) { note.textContent = t; note.hidden = false; }

    access.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) { return; }
      var region = sel.value;
      var addr = (email.value || '').trim();
      if (!region) { say('Please select your country.'); sel.focus(); return; }
      if (!validEmail(addr)) { say('Please check your email address.'); email.focus(); return; }
      busy = true;
      btn.disabled = true;
      note.hidden = true;
      saveRegion(region);
      var target = (m === 'kopilka')
        ? 'kopilka.html?r=' + region
        : 'thanks.html?m=' + m + '&r=' + region;
      var done = false;
      function go() { if (!done) { done = true; window.location.href = target; } }
      if (C.formEndpoint) {
        var fd = new FormData();
        fd.append('EMAIL', addr);
        fd.append('COUNTRY', sel.options[sel.selectedIndex].text);
        fd.append('REGION', region);
        fd.append('MATERIAL', m);
        try { fetch(C.formEndpoint, { method: 'POST', mode: 'no-cors', body: fd }).then(go, go); } catch (err) { go(); }
        setTimeout(go, 4000);
      } else {
        go();
      }
    });
  }

  /* Thank-you page */
  var thanks = $('[data-thanks]');
  if (thanks) {
    var tm = param('m');
    var titles = { mom: 'Phrases you shouldn’t say to your adult daughter', daughter: 'Phrases that help you stand your ground with Mom' };
    var tr = param('r') || loadRegion();
    var link = $('[data-thanks-pdf]');
    var tnote = $('[data-thanks-note]');
    if (titles[tm]) {
      $('[data-thanks-title]').textContent = titles[tm];
      var pdf = (C.pdf || {})[tm];
      if (pdf) { link.setAttribute('href', pdf); link.hidden = false; tnote.hidden = true; }
      else { link.hidden = true; tnote.hidden = false; }
    }
    var kl = $('[data-thanks-kopilka]');
    if (kl) { kl.setAttribute('href', REGIONS[tr] ? 'kopilka.html?r=' + tr : 'kopilka.html'); }
  }

  /* Holiday Gift Collection */
  var kop = $('[data-kopilka]');
  if (kop) {
    var regionSelect = $('[data-region-select]');
    var catsBox = $('[data-cats]');
    var col = window.COLLECTION || { categories: [], items: {} };
    var r = param('r');
    if (!REGIONS[r]) { r = loadRegion(); }
    if (!REGIONS[r]) { r = ''; }

    function externalLink(label, url, cls) {
      var a = document.createElement('a');
      a.className = cls; a.textContent = label; a.href = url;
      a.target = '_blank'; a.rel = 'sponsored noopener';
      return a;
    }

    var ICONS = {
      journals: '<svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 10h30a6 6 0 0 1 6 6v38H20a6 6 0 0 1-6-6z"/><path d="M14 48a6 6 0 0 1 6-6h30"/><path d="M26 22h16M26 30h10"/></svg>',
      ornaments: '<svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M32 6v8"/><path d="M27 14h10v5H27z"/><circle cx="32" cy="38" r="19"/><path d="M20 34c5 4 19 4 24 0"/></svg>',
      gift: '<svg viewBox="0 0 64 64" width="56" height="56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="10" y="26" width="44" height="28" rx="3"/><path d="M8 18h48v8H8zM32 18v36"/><path d="M32 18c-4-8-14-8-14-2s10 2 14 2zM32 18c4-8 14-8 14-2s-10 2-14 2z"/></svg>'
    };

    function render() {
      catsBox.textContent = '';
      var eff = r || 'other';
      if (!r) {
        var gn = document.createElement('p');
        gn.className = 'hint'; gn.style.marginTop = '8px';
        gn.textContent = 'Showing gifts that ship to most countries. Choose your country above for a better match.';
        catsBox.appendChild(gn);
      }
      col.categories.forEach(function (cat) {
        var step = document.createElement('div');
        step.className = 'step items kcat';
        if (cat.eyebrow) { var eb = document.createElement('div'); eb.className = 'eyebrow'; eb.textContent = cat.eyebrow; step.appendChild(eb); }
        var h = document.createElement('h2'); h.textContent = cat.title;
        var p = document.createElement('p'); p.className = 'kcat-text'; p.textContent = cat.text;
        step.appendChild(h); step.appendChild(p);
        var list = document.createElement('div');
        var list_items = (col.items[eff] || {})[cat.id] || [];
        if (!list_items.length && eff !== 'other') {
          list_items = (col.items.other || {})[cat.id] || [];
          if (list_items.length) {
            var fb = document.createElement('p');
            fb.className = 'hint';
            fb.textContent = 'We are still choosing picks for ' + REGIONS[eff] + '. Here are options that ship to most countries.';
            step.appendChild(fb);
          }
        }
        if (!list_items.length) { return; }
        var grid = document.createElement('div');
        grid.className = 'cards';
        list_items.forEach(function (it) {
          var card = document.createElement('article');
          card.className = 'pcard';
          var media = document.createElement('div');
          media.className = 'pmedia';
          function placeholder() {
            media.textContent = '';
            media.className = 'pmedia ph';
            var PH_LABEL = { journals: 'Memory journal', ornaments: 'Keepsake ornament', collages: 'Photo collage', jewelry: 'Photo locket', keychains: 'Photo keychain' };
            media.innerHTML = (ICONS[cat.id] || ICONS.gift) + '<span class="pph-label">' + (PH_LABEL[cat.id] || 'Gift idea') + '</span>';
          }
          var imgs = it.images || [];
          if (imgs.length) {
            var strip = document.createElement('div'); strip.className = 'pstrip';
            imgs.forEach(function (src, n) {
              var im = document.createElement('img');
              im.src = src; im.alt = n === 0 ? it.title : it.title + ' (photo ' + (n + 1) + ')';
              im.loading = 'lazy';
              im.addEventListener('error', function () {
                im.remove();
                if (!strip.children.length) { placeholder(); }
              });
              strip.appendChild(im);
            });
            media.appendChild(strip);
            if (imgs.length > 1) {
              var dots = document.createElement('div'); dots.className = 'pdots';
              imgs.forEach(function (_, n) {
                var d = document.createElement('button'); d.type = 'button'; d.setAttribute('aria-label', 'Photo ' + (n + 1));
                if (!n) { d.className = 'on'; }
                d.addEventListener('click', function () { strip.scrollTo({ left: n * strip.clientWidth, behavior: 'smooth' }); });
                dots.appendChild(d);
              });
              media.appendChild(dots);
              var prevB = document.createElement('button'); prevB.type = 'button'; prevB.className = 'pnav prev'; prevB.setAttribute('aria-label', 'Previous photo'); prevB.innerHTML = '&#8249;';
              var nextB = document.createElement('button'); nextB.type = 'button'; nextB.className = 'pnav next'; nextB.setAttribute('aria-label', 'Next photo'); nextB.innerHTML = '&#8250;';
              prevB.addEventListener('click', function () { strip.scrollBy({ left: -strip.clientWidth, behavior: 'smooth' }); });
              nextB.addEventListener('click', function () { strip.scrollBy({ left: strip.clientWidth, behavior: 'smooth' }); });
              media.appendChild(prevB); media.appendChild(nextB);
              function sync() {
                var idx = Math.round(strip.scrollLeft / strip.clientWidth);
                Array.prototype.forEach.call(dots.children, function (d, n) { d.className = n === idx ? 'on' : ''; });
                prevB.hidden = idx <= 0; nextB.hidden = idx >= imgs.length - 1;
              }
              strip.addEventListener('scroll', sync);
              sync();
            }
          } else { placeholder(); }
          card.appendChild(media);
          var body = document.createElement('div'); body.className = 'pbody';
          if (it.shop) { var s = document.createElement('div'); s.className = 'item-shop'; s.textContent = it.shop; body.appendChild(s); }
          var ih = document.createElement('h3'); ih.textContent = it.title; body.appendChild(ih);
          var ip = document.createElement('p'); ip.textContent = it.text; body.appendChild(ip);
          if (it.url) {
            body.appendChild(externalLink('View on ' + (it.shop ? it.shop.split(' ')[0] : 'the store'), it.url, 'btn btn-small'));
          }
          card.appendChild(body);
          grid.appendChild(card);
        });
        if (grid.children.length) { list.appendChild(grid); }
        if (cat.browse && cat.browse.url) {
          var br = document.createElement('div');
          br.className = 'it kbrowse';
          var spacer = document.createElement('div');
          var bp = document.createElement('p'); bp.textContent = 'More handmade options from independent sellers on Etsy. Shipping to ' + (r ? REGIONS[r] : 'your country') + ' depends on the seller.';
          spacer.appendChild(bp);
          br.appendChild(spacer);
          br.appendChild(externalLink(cat.browse.label, cat.browse.url, 'item-link'));
          list.appendChild(br);
        }
        step.appendChild(list);
        catsBox.appendChild(step);
      });
    }

    if (regionSelect) {
      regionSelect.value = r;
      regionSelect.addEventListener('change', function () {
        if (REGIONS[regionSelect.value]) { r = regionSelect.value; saveRegion(r); render(); }
      });
    }
    if (r) { saveRegion(r); }
    render();

    /* First visit: ask for the country in a small dialog. Skipping is fine. */
    function seenDialog() { try { return sessionStorage.getItem('nina_dialog') === '1'; } catch (e) { return false; } }
    function markDialog() { try { sessionStorage.setItem('nina_dialog', '1'); } catch (e) {} }
    if (!r && !seenDialog()) {
      var lastFocus = document.activeElement;
      var overlay = document.createElement('div');
      overlay.className = 'dlg-overlay';
      var box = document.createElement('div');
      box.className = 'dlg';
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-modal', 'true');
      box.setAttribute('aria-labelledby', 'dlg-title');
      var t = document.createElement('h2'); t.id = 'dlg-title'; t.textContent = 'Choose your region';
      var tp = document.createElement('p'); tp.textContent = 'Each region has its own selection of gifts. Pick yours to see it.';
      box.appendChild(t); box.appendChild(tp);
      var opts = document.createElement('div'); opts.className = 'dlg-opts';
      function closeDialog() {
        markDialog();
        document.removeEventListener('keydown', onKey);
        overlay.remove();
        if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
      }
      function onKey(e) { if (e.key === 'Escape') { closeDialog(); } }
      Object.keys(REGIONS).forEach(function (key) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'dlg-opt'; b.textContent = REGIONS[key];
        b.addEventListener('click', function () {
          r = key; saveRegion(r);
          if (regionSelect) { regionSelect.value = r; }
          render(); closeDialog();
        });
        opts.appendChild(b);
      });
      box.appendChild(opts);
      var skip = document.createElement('button');
      skip.type = 'button'; skip.className = 'dlg-skip'; skip.textContent = 'Skip for now';
      skip.addEventListener('click', closeDialog);
      box.appendChild(skip);
      overlay.appendChild(box);
      overlay.addEventListener('click', function (e) { if (e.target === overlay) { closeDialog(); } });
      document.addEventListener('keydown', onKey);
      document.body.appendChild(overlay);
      var first = opts.querySelector('button'); if (first) { first.focus(); }
    }
  }
})();
