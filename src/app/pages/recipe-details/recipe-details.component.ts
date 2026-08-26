import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipe';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {
  private readonly route = inject(ActivatedRoute);
  readonly recipeService = inject(RecipeService);
  readonly recipe: Recipe | undefined;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipe = this.recipeService.getById(id);
  }

  toggleFavorite(): void {
    if (this.recipe) {
      this.recipeService.toggleFavorite(this.recipe.id);
    }
  }
}
