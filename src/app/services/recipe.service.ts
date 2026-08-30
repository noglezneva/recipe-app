import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { catchError, forkJoin, map, Observable, of } from 'rxjs';

import {
  ApiRecipe,
  ApiRecipePreview,
  ApiRecipeResponse,
  ApiRecipesResponse,
} from '../models/api-recipe';

import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'https://forkify-api.jonas.io/api/v2/recipes';

  private readonly storageKey = 'recipe-app-favorites';

  readonly favoriteIds = signal<string[]>(this.readFavorites());

  getRecipes(): Observable<Recipe[]> {
    return this.searchRecipes('pizza');
  }

  searchRecipes(query: string): Observable<Recipe[]> {
    const search = query.trim() || 'pizza';

    return this.http
      .get<ApiRecipesResponse>(this.apiUrl, {
        params: {
          search,
        },
      })
      .pipe(
        map((response) =>
          response.data.recipes.map((recipe) => this.convertPreview(recipe)),
        ),
      );
  }

  getById(id: string): Observable<Recipe> {
    return this.http
      .get<ApiRecipeResponse>(`${this.apiUrl}/${id}`)
      .pipe(map((response) => this.convertRecipe(response.data.recipe)));
  }

  getFavoriteRecipes(): Observable<Recipe[]> {
    const ids = this.favoriteIds();

    if (ids.length === 0) {
      return of([]);
    }

    const requests = ids.map((id) =>
      this.getById(id).pipe(catchError(() => of(null))),
    );

    return forkJoin(requests).pipe(
      map((recipes) =>
        recipes.filter((recipe): recipe is Recipe => recipe !== null),
      ),
    );
  }

  isFavorite(id: string): boolean {
    return this.favoriteIds().includes(id);
  }

  toggleFavorite(id: string): void {
    this.favoriteIds.update((ids) =>
      ids.includes(id)
        ? ids.filter((favoriteId) => favoriteId !== id)
        : [...ids, id],
    );

    localStorage.setItem(this.storageKey, JSON.stringify(this.favoriteIds()));
  }

  private convertPreview(recipe: ApiRecipePreview): Recipe {
    return {
      id: recipe.id,
      title: recipe.title,
      category: this.getCategory(recipe.title),
      time: null,
      imageUrl: this.normalizeImageUrl(recipe.image_url),
      description: `Автор: ${recipe.publisher}`,
      ingredients: [],
      steps: [],
    };
  }

  private convertRecipe(recipe: ApiRecipe): Recipe {
    return {
      id: recipe.id,
      title: recipe.title,
      category: this.getCategory(recipe.title),
      time: recipe.cooking_time,
      imageUrl: this.normalizeImageUrl(recipe.image_url),
      description: `Автор: ${recipe.publisher}`,

      ingredients: recipe.ingredients.map((ingredient) => {
        const quantity = ingredient.quantity ?? '';

        return [quantity, ingredient.unit, ingredient.description]
          .filter(Boolean)
          .join(' ');
      }),

      steps: ['Полная инструкция доступна по ссылке на источник рецепта.'],
    };
  }

  private normalizeImageUrl(url: string): string {
    return url.replace(/^http:\/\//, 'https://');
  }

  private getCategory(title: string): Recipe['category'] {
    const name = title.toLowerCase();

    if (
      name.includes('cake') ||
      name.includes('cookie') ||
      name.includes('brownie') ||
      name.includes('dessert')
    ) {
      return 'Десерт';
    }

    if (
      name.includes('breakfast') ||
      name.includes('pancake') ||
      name.includes('waffle') ||
      name.includes('toast')
    ) {
      return 'Завтрак';
    }

    return 'Ужин';
  }

  private readFavorites(): string[] {
    try {
      const saved = localStorage.getItem(this.storageKey);

      return saved ? (JSON.parse(saved) as string[]) : [];
    } catch {
      return [];
    }
  }
}
