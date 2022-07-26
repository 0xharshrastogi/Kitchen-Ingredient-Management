import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Ingredient } from './../../../ingredients/ingredient.model';
import { SelectedIngredints } from './SelectedIngredients';

const INGREDIENT = 'ingredients';

@Component({
  selector: 'app-recipe-ingredients',
  templateUrl: './recipe-ingredients.component.html',
  styleUrls: ['./recipe-ingredients.component.scss'],
})
export class RecipeIngredientsComponent implements OnChanges {
  @Input() ingredients: Ingredient[];

  @Output() selectIngredients = new EventEmitter<Ingredient[]>();

  selectedIngredients = new SelectedIngredints();
  isIngredientAdded = false;

  get isAbleToAddSelectedIngredints(): boolean {
    if (this.isIngredientAdded || this.selectedIngredients.count === 0) return false;
    return true;
  }

  constructor() {
    this.ingredients = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes[INGREDIENT]?.isFirstChange()) {
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
    this.selectIngredients.emit(this.selectedIngredients.ingredients);
  }
}
