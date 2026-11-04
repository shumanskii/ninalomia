(function () {
  var C = window.NINA || {};
  var REGIONS = {
    us: 'США и Канада',
    uk: 'Великобритания и Ирландия',
    eu: 'Европа',
    cis: 'Россия и СНГ',
    oceania: 'Австралия и Новая Зеландия',
    other: 'Другие страны'
  };
  var SHOPS = {
    us: 'Amazon, Etsy, Bookshop.org',
    uk: 'Amazon UK, Etsy, Bookshop.org',
    eu: 'Amazon, Etsy и местные магазины',
    cis: 'Литрес и местные магазины',
    oceania: 'Amazon Australia, Etsy',
    other: 'магазины с доставкой в вашу страну'
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

  /* Соцсети */
  $$('[data-social]').forEach(function (a) {
    var url = (C.social || {})[a.getAttribute('data-social')];
    if (url) { a.setAttribute('href', url); a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); }
    else { a.setAttribute('href', '#'); a.addEventListener('click', function (e) { e.preventDefault(); }); }
  });

  /* Видео */
  var play = $('[data-video]');
  var videoNote = $('[data-video-note]');
  if (play) {
    if (C.videoUrl && videoNote) { videoNote.hidden = true; }
    play.addEventListener('click', function () {
      if (C.videoUrl) { window.open(C.videoUrl, '_blank', 'noopener'); }
      else if (videoNote) { videoNote.hidden = false; }
    });
  }

  /* Форма доступа: страна + почта */
  var access = $('[data-access]');
  if (access) {
    var MATERIALS = {
      mom: { eyebrow: 'Для мам', title: 'Какие фразы нельзя говорить взрослой дочери', lead: 'Короткий список слов, после которых дочь замолкает или обижается, и чем их можно заменить.', btn: 'Получить материал' },
      daughter: { eyebrow: 'Для дочерей', title: 'Фразы защиты от мамы', lead: 'Готовые ответы на вину, критику и непрошеные советы: чтобы не оправдываться и не доводить до ссоры.', btn: 'Получить материал' },
      kopilka: { eyebrow: 'Новогодняя копилка Нины', title: 'Подарки, которые можно заказать в вашей стране', lead: 'Магазины и доставка в разных странах разные. Скажите, где вы живёте, и мы покажем подборку именно для вас.', btn: 'Открыть копилку' }
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
      if (!region) { say('Выберите страну.'); sel.focus(); return; }
      if (!validEmail(addr)) { say('Проверьте адрес почты.'); email.focus(); return; }
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

  /* Страница «спасибо» */
  var thanks = $('[data-thanks]');
  if (thanks) {
    var tm = param('m');
    var titles = { mom: 'Какие фразы нельзя говорить взрослой дочери', daughter: 'Фразы защиты от мамы' };
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

  /* Копилка */
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
        a.className = 'item-link'; a.textContent = 'Смотреть'; a.href = it.url;
        a.target = '_blank'; a.rel = 'sponsored noopener';
        row.appendChild(a);
      } else {
        var sp = document.createElement('span'); sp.className = 'soon'; sp.textContent = 'СКОРО';
        row.appendChild(sp);
      }
      list.appendChild(row);
    });
  }
})();
