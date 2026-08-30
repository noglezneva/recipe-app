import { Component, inject, OnInit } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { Recipe } from '../../models/recipe';

import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
})
export class RecipeDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly recipeService = inject(RecipeService);

  recipe: Recipe | undefined;

  isLoading = true;

  errorMessage = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Некорректный ID рецепта.';

      this.isLoading = false;

      return;
    }

    this.recipeService.getById(id).subscribe({
      next: (recipe) => {
        this.recipe = recipe;
        this.isLoading = false;
      },

      error: () => {
        this.errorMessage = 'Не удалось загрузить рецепт.';

        this.isLoading = false;
      },
    });
  }

  toggleFavorite(): void {
    if (this.recipe) {
      this.recipeService.toggleFavorite(this.recipe.id);
    }
  }
}
