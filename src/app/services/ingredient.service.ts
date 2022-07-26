import { Injectable } from '@angular/core';
import { Ingredient } from '../components/ingredients/ingredient.model';

@Injectable({ providedIn: 'root' })
export class IngredientService {
  store = new Map<string, Ingredient>();

  add(ingredient: Ingredient) {
    if (!this.store.has(ingredient.id)) {
      this.store.set(ingredient.id, ingredient);
      return;
    }

    const clonedIngredient = this.store.get(ingredient.id)!.clone();
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
    this.remove(ingredientId!);
    return ingredient;
  }
}
