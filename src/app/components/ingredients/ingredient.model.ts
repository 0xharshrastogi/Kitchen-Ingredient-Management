export class Ingredient {
  id: string;

  name: string;

  quantity: number;

  constructor(name: string, quantity: number) {
    this.id = Ingredient.generateId(name);
    this.name = name;
    this.quantity = quantity;
  }

  clone() {
    return Ingredient.clone(this);
  }

  static clone(ingredient: Ingredient): Ingredient {
    return Object.assign(new Ingredient('DEFAULT_NAME', 0), ingredient);
  }

  static generateId(name: string) {
    return name.replaceAll(' ', '').toLowerCase();
  }

  static from(ingredientObj: { name: string; id: string; quantity: number }) {
    return Object.assign(new Ingredient(ingredientObj.name, ingredientObj.quantity), {
      id: ingredientObj.id,
    });
  }
}
