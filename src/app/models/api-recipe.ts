export interface ApiRecipePreview {
  id: string;
  title: string;
  publisher: string;
  image_url: string;
}

export interface ApiIngredient {
  quantity: number | null;
  unit: string;
  description: string;
}

export interface ApiRecipe extends ApiRecipePreview {
  source_url: string;
  servings: number;
  cooking_time: number;
  ingredients: ApiIngredient[];
}

export interface ApiRecipesResponse {
  status: string;
  results: number;
  data: {
    recipes: ApiRecipePreview[];
  };
}

export interface ApiRecipeResponse {
  status: string;
  data: {
    recipe: ApiRecipe;
  };
}