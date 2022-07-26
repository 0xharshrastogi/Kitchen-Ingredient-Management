import { Ingredient } from './../../../ingredients/ingredient.model';
import { Multiplier } from './mutliplier';

export class SelectedIngredints {
  multiplier = new Multiplier();

  private _ingredients: Ingredient[] = [];

  get ingredients(): Ingredient[] {
    return this._ingredients.map((ingredient) =>
      Object.assign(new Ingredient('', 0), ingredient, {
        quantity: ingredient.quantity * this.multiplier.value,
      })
    );
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
    const index = this._ingredients.findIndex(
      (ingredientData) => ingredientData.id === ingredient.id
    );

    if (index === -1) return; //Not Found

    this._ingredients.splice(index, 1);
  }

  clear() {
    this.multiplier.reset();
    this._ingredients = [];
  }
}
