import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ingredient } from './../../../ingredients/ingredient.model';
import { SelectedIngredints } from './SelectedIngredients';

@Component({
  selector: 'app-recipe-ingredients',
  templateUrl: './recipe-ingredients.component.html',
  styleUrls: ['./recipe-ingredients.component.scss'],
})
export class RecipeIngredientsComponent implements OnChanges {
  @Input() ingredients!: Ingredient[];

  selectedIngredients = new SelectedIngredints();

  isIngredientAdded = false;

  get isAbleToAddSelectedIngredints(): boolean {
    if (this.isIngredientAdded) return false;

    if (this.selectedIngredients.count === 0) return false;

    return true;
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('ingredients' in changes && !changes['ingredients'].isFirstChange()) {
      this.selectedIngredients.clear();
    }
  }

  onSelectIngredient(event: any, ingredient: Ingredient) {
    const isActionForAddIngredient = event.target.checked;

    isActionForAddIngredient
      ? this.selectedIngredients.add(ingredient)
      : this.selectedIngredients.remove(ingredient);
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.isIngredientAdded = true;
    console.log(this.selectedIngredients);
  }
}
