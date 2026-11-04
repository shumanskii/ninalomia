# ninalomia.com — сайт Нины Ломии

Обычный статический сайт (HTML, CSS, JavaScript). Сборка не нужна.

## Файлы
- `index.html` — главная; `access.html` — форма «страна + почта»; `kopilka.html` — новогодняя копилка по регионам; `collection.js` — товары копилки
- `thanks.html` — страница после получения бесплатного PDF (ссылки на PDF задаются в `config.js`)
- `privacy.html`, `terms.html` — заглушки, тексты нужно написать
- `config.js` — адрес сбора почт (formEndpoint), ссылки на PDF, соцсети, видео
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

## Сбор почт
- Пока `formEndpoint` в `config.js` пуст, форма пропускает человека дальше (страна определяет подборку), но почту НЕ сохраняет. Подключите Formspree, Web3Forms или Google Apps Script и вставьте адрес.

## Копилка
- Товары задаются в `collection.js` для 6 регионов (США/Канада, Великобритания/Ирландия, Европа, СНГ, Океания, другие). Пока `url` пустой, показывается «СКОРО».

## Перед запуском
- Тексты политики и условий; ссылки на соцсети и кризисные службы; цена набора; главное видео.
