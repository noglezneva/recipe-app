export interface Recipe {
  id: string;
  title: string;
  category: 'Завтрак' | 'Ужин' | 'Десерт';
  time: number | null;
  icon: string;
  description: string;
  ingredients: string[];
  steps: string[];
}