import { Component, inject, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

import { Recipe } from '../../models/recipe';

import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [FormsModule, RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  private readonly recipeService = inject(RecipeService);

  recipes: Recipe[] = [];

  query = '';

  selectedCategory = 'Все';

  isLoading = true;

  errorMessage = '';

  currentPage = 1;

  readonly pageSize = 12;

  readonly categories = ['Все', 'Завтрак', 'Ужин', 'Десерт'];

  ngOnInit(): void {
    this.loadRecipes();
  }

  loadRecipes(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.recipeService.getRecipes().subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.currentPage = 1;
        this.isLoading = false;
      },

      error: () => {
        this.errorMessage = 'Не удалось загрузить рецепты.';

        this.isLoading = false;
      },
    });
  }

  search(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.recipeService.searchRecipes(this.query).subscribe({
      next: (recipes) => {
        this.recipes = recipes;
        this.currentPage = 1;
        this.isLoading = false;
      },

      error: () => {
        this.errorMessage = 'Не удалось выполнить поиск.';

        this.isLoading = false;
      },
    });
  }

  onCategoryChange(): void {
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  get filteredRecipes(): Recipe[] {
    return this.recipes.filter(
      (recipe) =>
        this.selectedCategory === 'Все' ||
        recipe.category === this.selectedCategory,
    );
  }

  get paginatedRecipes(): Recipe[] {
    const start = (this.currentPage - 1) * this.pageSize;

    return this.filteredRecipes.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredRecipes.length / this.pageSize);
  }

  get pages(): number[] {
    return Array.from(
      {
        length: this.totalPages,
      },
      (_, index) => index + 1,
    );
  }
}
