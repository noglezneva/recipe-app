import { Injectable, signal } from '@angular/core';

import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private readonly storageKey = 'recipe-app-favorites';

  readonly recipes: Recipe[] = [
    {
      id: 1,
      title: 'Тост с авокадо',
      category: 'Завтрак',
      time: 10,
      icon: '🥑',
      description: 'Хрустящий тост с авокадо, лимоном и яйцом.',
      ingredients: [
        '2 ломтика хлеба',
        '1 авокадо',
        '1 яйцо',
        'Лимонный сок',
        'Соль и перец'
      ],
      steps: [
        'Поджарьте хлеб.',
        'Разомните авокадо с лимонным соком, солью и перцем.',
        'Приготовьте яйцо.',
        'Выложите авокадо и яйцо на тост.'
      ]
    },
    {
      id: 2,
      title: 'Паста в сливочно-томатном соусе',
      category: 'Ужин',
      time: 25,
      icon: '🍝',
      description: 'Быстрая паста в сливочно-томатном соусе для простого ужина.',
      ingredients: [
        '200 г пасты',
        '200 мл томатного соуса',
        '80 мл сливок',
        '1 зубчик чеснока',
        'Пармезан'
      ],
      steps: [
        'Отварите пасту.',
        'Обжарьте чеснок в течение одной минуты.',
        'Добавьте томатный соус и сливки.',
        'Добавьте пасту и посыпьте пармезаном.'
      ]
    },
    {
      id: 3,
      title: 'Панкейки с ягодами',
      category: 'Завтрак',
      time: 20,
      icon: '🥞',
      description: 'Мягкие панкейки с ягодами и йогуртом.',
      ingredients: [
        '150 г муки',
        '1 яйцо',
        '180 мл молока',
        '1 ч. л. разрыхлителя',
        'Ягоды'
      ],
      steps: [
        'Смешайте сухие ингредиенты.',
        'Добавьте яйцо и молоко.',
        'Обжарьте панкейки с двух сторон.',
        'Подавайте с ягодами.'
      ]
    },
    {
      id: 4,
      title: 'Шоколадный кекс в кружке',
      category: 'Десерт',
      time: 7,
      icon: '🍫',
      description: 'Небольшой шоколадный кекс, который можно приготовить прямо в кружке.',
      ingredients: [
        '4 ст. л. муки',
        '2 ст. л. какао',
        '2 ст. л. сахара',
        '4 ст. л. молока',
        '1 ст. л. растительного масла'
      ],
      steps: [
        'Смешайте все ингредиенты в кружке.',
        'Готовьте в микроволновке около 60–90 секунд.',
        'Дайте кексу остыть в течение минуты.'
      ]
    },
    {
      id: 5,
      title: 'Рис с курицей и овощами',
      category: 'Ужин',
      time: 30,
      icon: '🍚',
      description: 'Простое блюдо с курицей, рисом и овощами.',
      ingredients: [
        '150 г курицы',
        '100 г риса',
        'Овощная смесь',
        'Соевый соус',
        'Кунжут'
      ],
      steps: [
        'Приготовьте рис.',
        'Обжарьте курицу до золотистой корочки.',
        'Добавьте овощи и соевый соус.',
        'Подавайте вместе с рисом.'
      ]
    },
    {
      id: 6,
      title: 'Йогурт с яблоком',
      category: 'Десерт',
      time: 5,
      icon: '🍎',
      description: 'Лёгкий десерт с йогуртом, яблоком и корицей.',
      ingredients: [
        'Греческий йогурт',
        '1 яблоко',
        'Корица',
        'Мёд',
        'Гранола'
      ],
      steps: [
        'Нарежьте яблоко кубиками.',
        'Выложите слоями йогурт, яблоко и гранолу.',
        'Добавьте корицу и мёд.'
      ]
    }
  ];

  readonly favoriteIds = signal<number[]>(this.readFavorites());

  getById(id: number): Recipe | undefined {
    return this.recipes.find((recipe) => recipe.id === id);
  }

  isFavorite(id: number): boolean {
    return this.favoriteIds().includes(id);
  }

  toggleFavorite(id: number): void {
    this.favoriteIds.update((ids) =>
      ids.includes(id)
        ? ids.filter((favoriteId) => favoriteId !== id)
        : [...ids, id]
    );

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.favoriteIds())
    );
  }

  getFavoriteRecipes(): Recipe[] {
    return this.recipes.filter((recipe) =>
      this.favoriteIds().includes(recipe.id)
    );
  }

  private readFavorites(): number[] {
    try {
      const saved = localStorage.getItem(this.storageKey);

      return saved
        ? JSON.parse(saved) as number[]
        : [];
    } catch {
      return [];
    }
  }
}