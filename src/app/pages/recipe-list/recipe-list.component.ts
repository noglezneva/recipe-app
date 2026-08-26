import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  RecipeCardComponent
} from '../../components/recipe-card/recipe-card.component';

import { Recipe } from '../../models/recipe';

import {
  RecipeService
} from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    FormsModule,
    RecipeCardComponent
  ],
  templateUrl:
    './recipe-list.component.html',
  styleUrl:
    './recipe-list.component.css'
})
export class RecipeListComponent
  implements OnInit {

  private readonly recipeService =
    inject(RecipeService);

  recipes: Recipe[] = [];

  query = '';

  selectedCategory = 'Все';

  isLoading = true;

  errorMessage = '';

  readonly categories = [
    'Все',
    'Завтрак',
    'Ужин',
    'Десерт'
  ];

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.recipeService
      .getRecipes()
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes;

          this.isLoading = false;
        },

        error: () => {
          this.errorMessage =
            'Не удалось загрузить рецепты.';

          this.isLoading = false;
        }
      });
  }

  search(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.recipeService
      .searchRecipes(this.query)
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes;

          this.isLoading = false;
        },

        error: () => {
          this.errorMessage =
            'Не удалось выполнить поиск.';

          this.isLoading = false;
        }
      });
  }

  get filteredRecipes(): Recipe[] {
    return this.recipes.filter(
      (recipe) => {
        const matchesCategory =
          this.selectedCategory === 'Все' ||
          recipe.category ===
            this.selectedCategory;

        return matchesCategory;
      }
    );
  }
}