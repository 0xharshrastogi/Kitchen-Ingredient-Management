import { Injectable } from '@angular/core';
import { Ingredient } from '../components/ingredients/ingredient.model';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  protected store = new Map<string, Ingredient>();

  get ingredients() {
    return [...this.store.values()];
  }

  add(ingredient: Ingredient) {
    if (!this.store.has(ingredient.id)) {
      this.store.set(ingredient.id, ingredient);
      return;
    }

    const clonedIngredient = this.get(ingredient.id)!.clone();
    clonedIngredient.quantity += ingredient.quantity;
    this.store.set(ingredient.id, clonedIngredient);
  }

  remove(ingredientId: string): Ingredient | undefined;
  remove(ingredient: Ingredient): Ingredient | undefined;
  remove(value: unknown) {
    let ingredientId: string;

    if (value instanceof Ingredient) ingredientId = value.id;
    else if (typeof value === 'string') ingredientId = value;
    else
      throw new TypeError(
        `Invalid value for ${value} Expected [string | Ingredient], got ${typeof value}`
      );

    const ingredient = this.store.get(ingredientId!);
    this.store.delete(ingredientId!);
    return ingredient;
  }

  get(ingredientId: string): Ingredient | undefined {
    return this.store.get(ingredientId);
  }

  update(ingredientId: string, updateInfo: Partial<Ingredient>): void {
    const { name, quantity } = Object.assign(this.get(ingredientId)!, updateInfo);
    const updatedIngredient = new Ingredient(name, quantity);

    this.store.delete(ingredientId);
    this.store.set(updatedIngredient.id, updatedIngredient);
  }
}
