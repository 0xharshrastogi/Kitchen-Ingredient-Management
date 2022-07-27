import { Component } from '@angular/core';
import { IngredientService } from './../../services/ingredient.service';
import { Ingredient } from './ingredient.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent {
  constructor(private readonly ingredientService: IngredientService) {}

  get ingredients() {
    return this.ingredientService.ingredients;
  }

  onIngredientCreate(ingredient: Ingredient) {
    this.ingredientService.add(ingredient);
  }

  onIngredientDelete(ingredient: Ingredient) {
    console.log(ingredient);
    this.ingredientService.remove(ingredient);
  }
}
