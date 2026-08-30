export interface Recipe {
  id: string;
  title: string;
  category: 'Завтрак' | 'Ужин' | 'Десерт';
  time: number | null;
  imageUrl: string;
  description: string;
  ingredients: string[];
  steps: string[];
}
