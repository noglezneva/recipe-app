import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-card.component.html',
  styleUrl: './recipe-card.component.css'
})
export class RecipeCardComponent {
  @Input({ required: true })
  recipe!: Recipe;

  readonly recipeService =
    inject(RecipeService);

  toggleFavorite(): void {
    this.recipeService.toggleFavorite(
      this.recipe.id
    );
  }
}