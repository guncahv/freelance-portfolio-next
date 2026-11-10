# Портфолио фриланс-разработчика — Next.js (SSR + SSG)

Лабораторная работа №25 «Перенос/создание веб-приложения на Next.js (или Nuxt.js) для реализации SSR или SSG».
Вариант 1 — «Портфолио фриланс-разработчика».

Выполнил: Рахманкулов А., группа 310101.

Проект — перенос React-приложения из ЛР №19–23 (React + React Bootstrap) на мета-фреймворк **Next.js** (Pages Router)
с гибридной стратегией рендеринга.

## Страницы и стратегии рендеринга

| Маршрут | Файл | Стратегия | Функция получения данных |
|---|---|---|---|
| `/` | `pages/index.js` | **SSR** — HTML создаётся на сервере при каждом запросе | `getServerSideProps` |
| `/about` | `pages/about.js` | **SSG** — HTML создаётся один раз при сборке | `getStaticProps` |
| `/projects/[id]` | `pages/projects/[id].js` | **SSG** для 6 проектов | `getStaticPaths` + `getStaticProps` |

На каждой странице вверху выводится плашка со стратегией и временем генерации HTML:
на главной время меняется при каждом обновлении страницы (SSR), на `/about` и страницах проектов —
остаётся временем сборки (SSG).

## Стек

- Next.js 15 (Pages Router), React 19
- React Bootstrap 2 + Bootstrap 5.3 (компоненты и сетка из ЛР №23)
- PropTypes

## Сборка и запуск

Нужен [Node.js](https://nodejs.org/) 18.18 или новее.

```bash
git clone https://github.com/guncahv/freelance-portfolio-next.git
cd freelance-portfolio-next
npm install
npm run build   # production-сборка: SSG-страницы генерируются на этом шаге
npm run start   # запуск production-сервера: http://localhost:3000
```

Режим разработки: `npm run dev`.

## Как проверить SSR и SSG

1. Откройте `view-source:http://localhost:3000/` — в исходном коде уже есть HTML карточек проектов и статуса
   «Open to work», а в `<script id="__NEXT_DATA__">` — `"gssp":true` (страница отрендерена через getServerSideProps).
   Обновите страницу — время в плашке SSR изменится.
2. Откройте `view-source:http://localhost:3000/about` — HTML уже содержит текст страницы, в `__NEXT_DATA__` —
   `"gsp":true` (getStaticProps). Время в плашке SSG при обновлении не меняется — это время сборки.
3. В выводе `npm run build` страницы отмечены значками: `ƒ` (Dynamic, SSR) для `/` и `●` (SSG) для `/about` и
   `/projects/[id]`.

## Структура проекта

```
components/   # компоненты, перенесённые из ЛР №19–23 (Header, ProjectCard, AppButton, FormField, ...)
data/         # mock-данные: проекты и пункты меню
lib/api.js    # имитация серверного API (статус специалиста, контент «Обо мне», проекты)
pages/        # файловый роутинг Next.js
  _app.js, _document.js
  index.js            # /            SSR
  about.js            # /about       SSG
  projects/[id].js    # /projects/*  SSG + getStaticPaths
public/assets/        # иконки и изображения
styles/globals.css    # тема поверх переменных Bootstrap
```
