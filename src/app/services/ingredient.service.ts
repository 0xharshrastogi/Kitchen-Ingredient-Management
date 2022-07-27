import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './../components/ingredients/ingredient.model';

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

@Injectable({ providedIn: 'root' })
export class IngredientServiceLocal {
  create = new Subject<Ingredient>();

  ingredients: Ingredient[] = [];

  constructor() {}

  find(ingredientId: string) {
    return this.ingredients.find((value) => value.id === ingredientId);
  }

  add(ingredient: Ingredient) {
    if (this.find(ingredient.id)) return;

    this.ingredients.push(ingredient);
    this.create.next(ingredient);
  }

  remove(ingredientId: string) {
    const index = this.ingredients.findIndex(
      (ingredient) => ingredient.id === ingredientId
    );

    if (index === -1) return;
    this.ingredients.splice(index, 1);
  }

  update(ingredientId: string, updateInfo: Partial<Ingredient>) {
    const index = this.ingredients.findIndex(
      (ingredient) => ingredientId === ingredient.id
    );
    console.log({ index, updateInfo, ingredientId });
    if (index === -1) return;

    this.ingredients[index] = Object.assign(
      new Ingredient('', 0),
      this.ingredients[index],
      updateInfo
    );

    console.log(this.ingredients);
  }
}
