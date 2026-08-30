# Книга рецептов

Небольшой пет-проект на Angular для изучения основных концепций фреймворка.

## Что используется

- Angular Components
- Angular Router
- Dependency Injection
- `@Input`
- `@if` и `@for`
- `[(ngModel)]`
- Signals
- `localStorage`
- поиск и фильтрация рецептов

## Запуск проекта

Установить зависимости:

```bash
npm install
```

Запустить проект:

```bash
npm start
```

Открыть в браузере:

```text
http://localhost:4200
```

## Основные маршруты

- `/recipes` — список рецептов
- `/recipes/:id` — страница рецепта
- `/favorites` — избранное

## Основные файлы

- `app.routes.ts` — маршруты
- `recipe-list.component.ts` — поиск и фильтрация
- `recipe-card.component.ts` — карточка рецепта
- `recipe.service.ts` — данные, избранное и `localStorage`
- `recipe-details.component.ts` — страница отдельного рецепта
