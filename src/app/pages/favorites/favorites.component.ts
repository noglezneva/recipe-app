import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { RouterLink } from '@angular/router';

import {
  RecipeCardComponent
} from '../../components/recipe-card/recipe-card.component';

import { Recipe } from '../../models/recipe';

import {
  RecipeService
} from '../../services/recipe.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    RecipeCardComponent,
    RouterLink
  ],
  templateUrl:
    './favorites.component.html',
  styleUrl:
    './favorites.component.css'
})
export class FavoritesComponent
  implements OnInit {

  private readonly recipeService =
    inject(RecipeService);

  recipes: Recipe[] = [];

  isLoading = true;

  errorMessage = '';

  ngOnInit(): void {
    this.recipeService
      .getFavoriteRecipes()
      .subscribe({
        next: (recipes) => {
          this.recipes = recipes;

          this.isLoading = false;
        },

        error: () => {
          this.errorMessage =
            'Не удалось загрузить избранное.';

          this.isLoading = false;
        }
      });
  }
}