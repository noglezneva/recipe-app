import { Routes } from '@angular/router';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipes' },
  { path: 'recipes', component: RecipeListComponent },
  { path: 'recipes/:id', component: RecipeDetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', redirectTo: 'recipes' }
];
