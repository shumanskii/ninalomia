# ninalomia.com — сайт Нины Ломии

Обычный статический сайт (HTML, CSS, JavaScript). Сборка не нужна.

## Файлы
- `index.html` — главная; `prompts.html` — промпты и оплата; `kopilka.html` — копилка
- `thanks.html` — страница после оплаты (замените ссылку на PDF)
- `privacy.html`, `terms.html` — заглушки, тексты нужно написать
- `config.js` — ссылка Stripe, адреса форм рассылки, ссылка на видео
- `style.css`, `app.js`, `img/`
- `CNAME` — адрес сайта (ninalomia.com), `.nojekyll` — отключает Jekyll

## Публикация на GitHub Pages
1. Репозиторий: github.com/shumanskii/ninalomia (публичный).
2. Загрузите в него все файлы из этой папки (Add file → Upload files).
3. Settings → Pages → Build and deployment → Source: Deploy from a branch, Branch: main, папка / (root) → Save.
4. Settings → Pages → Custom domain: ninalomia.com → Save. Когда сертификат будет готов, включите Enforce HTTPS.

## DNS у регистратора домена (Webglobe)
- Четыре записи типа A для ninalomia.com: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 (сверьте с документацией GitHub Pages).
- Запись CNAME: имя www, значение shumanskii.github.io.

## Stripe
- В `config.js` стоит ТЕСТОВАЯ ссылка. Для боевых продаж создайте ссылку в живом режиме и замените.
- В Stripe в настройке After payment укажите https://ninalomia.com/thanks.html.
- На странице `thanks.html` замените ссылку на PDF.

## Рассылка
- Формы пока показывают «Рассылка ещё подключается». Когда заведёте Brevo или MailerLite, вставьте адреса форм в `config.js` (forms).

## Перед запуском
- Тексты политики и условий; ссылки на соцсети и кризисные службы; цена набора; главное видео.
