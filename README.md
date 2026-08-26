# Angular Recipe App

A small beginner-friendly pet project for learning Angular.

## What is inside

- standalone Angular components
- Angular Router
- a service with Dependency Injection (`RecipeService`)
- `@Input` in `RecipeCardComponent`
- modern template control flow: `@if` and `@for`
- two-way binding with `[(ngModel)]`
- Signals for favorites
- `localStorage` for persistence
- search and category filtering

## Requirements

This project uses Angular 22. Angular 22 requires a supported Node.js version; the official Angular compatibility table currently lists Node.js `^22.22.3`, `^24.15.0`, or `^26.0.0`.

Check your version:

```bash
node -v
npm -v
```

## Run the project

1. Unzip the project.
2. Open the `angular-recipe-app` folder in VS Code.
3. Open a terminal in that folder.
4. Install dependencies:

```bash
npm install
```

5. Start the development server:

```bash
npm start
```

6. Open:

```text
http://localhost:4200
```

You do **not** need to install Angular CLI globally because it is included as a project dependency and `npm start` uses the local CLI.

## Useful commands

```bash
npm start
npm run build
```

## Where to start reading the code

1. `src/main.ts` — starts Angular.
2. `src/app/app.config.ts` — app providers and router setup.
3. `src/app/app.routes.ts` — routes.
4. `src/app/pages/recipe-list/recipe-list.component.ts` — search/filter logic.
5. `src/app/components/recipe-card/recipe-card.component.ts` — component + `@Input` + DI.
6. `src/app/services/recipe.service.ts` — service, Signal and localStorage.
7. `src/app/pages/recipe-details/recipe-details.component.ts` — route parameter.

## Routes

- `/recipes` — all recipes
- `/recipes/:id` — one recipe
- `/favorites` — favorites

## Good next exercises

- add a form for creating a recipe
- move mock recipes to an API
- add `HttpClient`
- add RxJS operators
- write a unit test for `RecipeService`
- add a route guard
