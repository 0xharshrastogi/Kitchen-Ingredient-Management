import { Ingredient } from './../../../ingredients/ingredient.model';
import { Multiplier } from './Mutliplier';

export class SelectedIngredints {
  multiplier = new Multiplier();

  private _ingredients: Ingredient[] = [];

  get ingredients(): Ingredient[] {
    return this._ingredients.map((ingredient) => {
      const clonedIngredient = ingredient.clone();
      clonedIngredient.quantity *= this.multiplier.value;
      return clonedIngredient;
    });
  }

  get count() {
    return this._ingredients.length;
  }

  constructor(ingredients?: Ingredient[]) {
    if (ingredients) this._ingredients = ingredients;
  }

  add(ingredient: Ingredient): void {
    this._ingredients.push(ingredient);
  }

  remove(ingredient: Ingredient): void {
    const findFn = (ingredientData: Ingredient) => ingredientData.id === ingredient.id;
    const index = this._ingredients.findIndex(findFn);

    if (index === -1) return; //Not Found
    this._ingredients.splice(index, 1);
  }

  clear() {
    this.multiplier.reset();
    this._ingredients = [];
  }
}
