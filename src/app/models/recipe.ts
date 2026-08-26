export interface Recipe {
  id: number;
  title: string;
  category: 'Завтрак' | 'Ужин' | 'Десерт';
  time: number;
  icon: string;
  description: string;
  ingredients: string[];
  steps: string[];
}
