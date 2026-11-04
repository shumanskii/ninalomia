# ninalomia.com — Nina Lomia (English site)

Обычный статический сайт (HTML, CSS, JavaScript). Сборка не нужна. Это АНГЛИЙСКАЯ версия, она живёт в репозитории shumanskii/ninalomia и открывается на ninalomia.com. Русская версия хранится отдельно (архив ninalomia-ru-site.zip, репозиторий shumanskii/ninalomia-ru).

## Файлы
- `index.html` — главная; `access.html` — форма «страна + почта»; `kopilka.html` — Holiday Gift Guide по регионам; `collection.js` — товары (5 регионов: US/Canada, UK/Ireland, Europe, Oceania, Other)
- `thanks.html` — страница после получения бесплатного PDF (ссылки на PDF задаются в `config.js`)
- `privacy.html`, `terms.html` — черновики на английском (показать юристу)
- `config.js` — адрес сбора заявок (Make), ссылки на PDF, соцсети, видео (общий с русской версией)
- `style.css`, `app.js`, `img/`
- `CNAME` — ninalomia.com, `.nojekyll` — отключает Jekyll

## Заявки
Форма отправляет EMAIL, COUNTRY (название страны по-английски), REGION (us, uk, eu, oceania, other) и MATERIAL (mom, daughter, kopilka) в Make, оттуда в Notion «Подписчики Нины». Русские заявки раньше записывались с русскими названиями стран.

## Перед запуском
- Партнёрские ссылки в `collection.js` (3–5 на регион), PDF в `config.js`, соцсети, видео
- Юридические тексты на проверку; название сервиса рассылки в privacy.html
