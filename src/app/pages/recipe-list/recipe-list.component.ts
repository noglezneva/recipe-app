import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [FormsModule, RecipeCardComponent],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  private readonly recipeService = inject(RecipeService);

  query = '';
  selectedCategory = 'Все';
  readonly categories = ['Все', 'Завтрак', 'Ужин', 'Десерт'];

  get filteredRecipes(): Recipe[] {
    const normalizedQuery = this.query.trim().toLowerCase();

    return this.recipeService.recipes.filter((recipe) => {
      const matchesQuery = recipe.title.toLowerCase().includes(normalizedQuery);
      const matchesCategory = this.selectedCategory === 'Все' || recipe.category === this.selectedCategory;
      return matchesQuery && matchesCategory;
    });
  }
}
