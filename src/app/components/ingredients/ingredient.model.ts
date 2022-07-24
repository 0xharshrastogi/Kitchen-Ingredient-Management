export class Ingredient {
  name: string;

  amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }

  clone() {
    return Ingredient.clone(this);
  }

  static clone(ingredient: Ingredient): Ingredient {
    return Object.assign(new Ingredient('DEFAULT_NAME', 0), ingredient);
  }
}
