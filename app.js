(function () {
  var C = window.NINA || {};
  var REGIONS = {
    us: 'USA and Canada',
    uk: 'United Kingdom and Ireland',
    eu: 'Europe',
    oceania: 'Australia and New Zealand',
    other: 'Other countries'
  };
  var SHOPS = {
    us: 'Amazon, Etsy, Bookshop.org',
    uk: 'Amazon UK, Etsy, Bookshop.org',
    eu: 'Amazon, Etsy and local stores',
    oceania: 'Amazon Australia, Etsy',
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
  function loadRegion() { try { return localStorage.getItem('nina_region') || ''; } catch (e) { return ''; } }

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
      mom: { eyebrow: 'For mothers', title: 'Phrases you shouldn’t say to your adult daughter', lead: 'A short list of words that make a daughter go quiet or feel hurt, and what you can say instead.', btn: 'Get the material' },
      daughter: { eyebrow: 'For daughters', title: 'Phrases that help you stand your ground with Mom', lead: 'Ready-made replies to guilt, criticism, and unsolicited advice, so you don’t have to justify yourself or end up in a fight.', btn: 'Get the material' },
      kopilka: { eyebrow: 'Nina’s Holiday Gift Guide', title: 'Gifts you can order in your country', lead: 'Stores and delivery differ from country to country. Tell us where you live and we’ll show a selection just for you.', btn: 'Open the gift guide' }
    };
    var m = param('m');
    if (!MATERIALS[m]) { m = 'kopilka'; }
    var info = MATERIALS[m];
    $('[data-access-eyebrow]').textContent = info.eyebrow;
    $('[data-access-title]').textContent = info.title;
    $('[data-access-lead]').textContent = info.lead;
    var btn = $('button[type="submit"]', access);
    btn.textContent = info.btn;
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
        step.className = 'step items';
        step.style.marginTop = '40px';
        var h = document.createElement('h2'); h.textContent = cat.title;
        var p = document.createElement('p'); p.className = 'hint'; p.style.fontSize = '16.5px'; p.textContent = cat.text;
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
        list_items.forEach(function (it) {
          var row = document.createElement('div');
          row.className = 'it';
          if (it.images && it.images.length) {
            row.className = 'it has-gallery';
            var gal = document.createElement('div'); gal.className = 'gallery';
            it.images.forEach(function (src, n) {
              var im = document.createElement('img');
              im.src = src; im.alt = n === 0 ? it.title : it.title + ' (photo ' + (n + 1) + ')';
              im.loading = 'lazy';
              im.addEventListener('error', function () {
                im.remove();
                if (!gal.children.length) { gal.remove(); row.className = 'it'; }
              });
              gal.appendChild(im);
            });
            row.appendChild(gal);
          }
          var left = document.createElement('div');
          var ih = document.createElement('h3'); ih.textContent = it.title;
          var ip = document.createElement('p'); ip.textContent = it.text;
          left.appendChild(ih); left.appendChild(ip);
          if (it.shop) {
            var s = document.createElement('div'); s.className = 'item-shop'; s.textContent = it.shop; left.appendChild(s);
          }
          if (it.images && it.images.length && it.url) {
            var act = document.createElement('div'); act.className = 'item-act';
            act.appendChild(externalLink('View on ' + (it.shop ? it.shop.split(' ')[0] : 'the store'), it.url, 'btn btn-small'));
            left.appendChild(act);
            row.appendChild(left);
          } else {
            row.appendChild(left);
            if (it.url) { row.appendChild(externalLink('View', it.url, 'item-link')); }
          }
          list.appendChild(row);
        });
        if (cat.browse && cat.browse.url) {
          var br = document.createElement('div');
          br.className = 'it';
          var spacer = document.createElement('div');
          var bp = document.createElement('p'); bp.textContent = 'Handmade options from independent sellers on Etsy. Shipping to ' + (r ? REGIONS[r] : 'your country') + ' depends on the seller.';
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
