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
    if (kl) { kl.setAttribute('href', REGIONS[tr] ? 'kopilka.html?r=' + tr : 'access.html?m=kopilka'); }
  }

  /* Gift guide */
  var kop = $('[data-kopilka]');
  if (kop) {
    var r = param('r');
    if (!REGIONS[r]) { r = loadRegion(); }
    if (!REGIONS[r]) { window.location.replace('access.html?m=kopilka'); return; }
    saveRegion(r);
    $('[data-region-name]').textContent = REGIONS[r];
    $('[data-region-shops]').textContent = SHOPS[r];
    var list = $('[data-items]');
    ((window.COLLECTION || {})[r] || []).forEach(function (it) {
      var row = document.createElement('div');
      row.className = 'it';
      var left = document.createElement('div');
      var h = document.createElement('h3'); h.textContent = it.title;
      var p = document.createElement('p'); p.textContent = it.text;
      left.appendChild(h); left.appendChild(p);
      if (it.shop && it.url) {
        var s = document.createElement('div'); s.className = 'item-shop'; s.textContent = it.shop; left.appendChild(s);
      }
      row.appendChild(left);
      if (it.url) {
        var a = document.createElement('a');
        a.className = 'item-link'; a.textContent = 'View'; a.href = it.url;
        a.target = '_blank'; a.rel = 'sponsored noopener';
        row.appendChild(a);
      } else {
        var sp = document.createElement('span'); sp.className = 'soon'; sp.textContent = 'SOON';
        row.appendChild(sp);
      }
      list.appendChild(row);
    });
  }
})();
