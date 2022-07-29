import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IngredientHttpService } from 'src/app/services/http/ingredient.service';
import { Ingredient } from '../../ingredients/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.scss'],
})
export class RecipeInfoComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly ingredientHttpService: IngredientHttpService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      const recipe = data['recipe'];
      if (!recipe) return;
      this.recipe = recipe;
    });
  }

  onSelectIngredient(selectedIngredients: Ingredient[]) {
    console.log(selectedIngredients);
    selectedIngredients.forEach((ingredient) =>
      this.ingredientHttpService.postIngredient(ingredient).subscribe(console.log)
    );
  }
}
