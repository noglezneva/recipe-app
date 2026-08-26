import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RecipeCardComponent, RouterLink],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  private readonly recipeService = inject(RecipeService);

  get recipes(): Recipe[] {
    return this.recipeService.getFavoriteRecipes();
  }
}
