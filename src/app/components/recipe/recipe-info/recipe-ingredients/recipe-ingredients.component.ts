import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Ingredient } from './../../../ingredients/ingredient.model';

@Component({
  selector: 'app-recipe-ingredients',
  templateUrl: './recipe-ingredients.component.html',
  styleUrls: ['./recipe-ingredients.component.scss'],
})
export class RecipeIngredientsComponent implements OnInit, OnChanges {
  @Input() ingredients!: Ingredient[];

  selectedIngredients: Ingredient[] = [];

  isIngredientAdded = false;

  multiplier = 1;

  constructor() {}

  get selectedIngredientCount() {
    return this.selectedIngredients.length;
  }

  ngOnInit(): void {
    console.count(RecipeIngredientsComponent.name);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onSelectIngredient(event: any, ingredientId: string) {
    event.target.checked
      ? this.addToSelectedIngredient(ingredientId)
      : this.removeFromSelectedIngredient(ingredientId);
  }

  async addToSelectedIngredient(ingredientId: string) {
    const ingredient = this.ingredients.find(
      (ingredient) => ingredientId === ingredient.id
    )!;

    this.selectedIngredients.push(Object.assign({}, ingredient));
  }

  async removeFromSelectedIngredient(ingredientId: string) {
    const index = this.selectedIngredients.findIndex(
      (ingredient) => ingredientId === ingredient.id
    )!;

    this.selectedIngredients.splice(index, 1);
  }

  decreaseMultiplier() {
    if (this.multiplier <= 1) return;
    this.multiplier--;
  }

  increaseMultiplier() {
    this.multiplier++;
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    console.log(this.selectedIngredients);
  }
}
