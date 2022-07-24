import { Ingredient } from './../ingredients/ingredient.model';
export class Recipe {
  id = Math.round(Math.random() * 10000).toString();

  title: string;

  description = '';

  imageUri: string | null = null;

  isVegitarian: boolean = true;

  ingredients: Ingredient[] = [];

  constructor(title: string) {
    this.title = title;
  }

  clone() {
    return Recipe.clone(this);
  }

  static clone(recipe: Recipe): Recipe {
    const clonedRecipe = Object.assign(new Recipe(''), recipe);
    clonedRecipe.ingredients = recipe.ingredients.map((ingredient) => ingredient.clone());
    return clonedRecipe;
  }
}
