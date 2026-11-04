(function () {
  var C = window.NINA || {};
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function validEmail(v) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v); }

  /* Формы рассылки */
  $$('form[data-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      var key = form.getAttribute('data-form');
      var url = (C.forms || {})[key];
      var note = $('.form-note', form);
      if (!url) {
        e.preventDefault();
        if (note) {
          note.textContent = 'Рассылка ещё подключается. Загляните чуть позже.';
          note.hidden = false;
        }
        return;
      }
      form.setAttribute('action', url);
      form.setAttribute('method', 'POST');
    });
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

  /* Страница промптов: роль + почта + Stripe */
  var prompts = $('[data-prompts]');
  if (prompts) {
    var role = null;
    var inside = {
      daughter: [
        'Ответить на критику, не оправдываясь и не ссорясь',
        'Отказать и не чувствовать вину',
        'Написать маме после долгой паузы',
        'Попросить о дистанции спокойно и ясно'
      ],
      mother: [
        'Извиниться без оправданий',
        'Спросить, как дела, не давя',
        'Принять просьбу дочери о дистанции',
        'Написать дочери после ссоры'
      ]
    };
    var buttons = $$('[data-role]', prompts);
    var hintEl = $('[data-role-hint]', prompts);
    var insideBox = $('[data-inside]', prompts);
    var list = $('[data-inside-list]', prompts);
    var email = $('#prompts-email');
    var pay = $('[data-pay]');
    var payNote = $('[data-pay-note]');

    function refresh() {
      var ok = !!role && validEmail((email.value || '').trim()) && !!C.stripeLink;
      pay.disabled = !ok;
      pay.setAttribute('aria-disabled', ok ? 'false' : 'true');
    }
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        role = b.getAttribute('data-role');
        buttons.forEach(function (x) {
          var on = x === b;
          x.classList.toggle('is-on', on);
          x.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        hintEl.hidden = true;
        insideBox.hidden = false;
        list.innerHTML = '';
        inside[role].forEach(function (t) {
          var li = document.createElement('li');
          li.textContent = t;
          list.appendChild(li);
        });
        refresh();
      });
    });
    email.addEventListener('input', refresh);
    pay.addEventListener('click', function () {
      if (pay.disabled) { return; }
      var mail = (email.value || '').trim();
      var url = C.stripeLink + (C.stripeLink.indexOf('?') >= 0 ? '&' : '?') +
        'client_reference_id=' + encodeURIComponent(role) +
        '&prefilled_email=' + encodeURIComponent(mail);
      window.location.href = url;
    });
    if (!C.stripeLink && payNote) {
      payNote.textContent = 'Оплата ещё подключается.';
    }
    refresh();
  }

  /* Страница копилки: страна */
  var kop = $('[data-kopilka]');
  if (kop) {
    var shops = {
      us: 'Bookshop.org, Amazon, Etsy',
      eu: 'Bookshop.org (Великобритания), Amazon, Etsy, местные книжные',
      ru: 'Литрес, российские книжные и магазины подарков',
      other: 'Подберём то, что доставляется в вашу страну'
    };
    var sel = $('#kop-country');
    var hint = $('[data-region-hint]', kop);
    var box = $('[data-region-box]', kop);
    var txt = $('[data-region-shops]', kop);
    sel.addEventListener('change', function () {
      var v = sel.value;
      if (v && shops[v]) {
        txt.textContent = shops[v];
        box.hidden = false;
        hint.hidden = true;
      } else {
        box.hidden = true;
        hint.hidden = false;
      }
    });
  }
})();
