export class Ingredient {
  id: string;

  name: string;

  quantity: number;

  constructor(name: string, amount: number) {
    this.id = Ingredient.generateId(name);
    this.name = name;
    this.quantity = amount;
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
}
