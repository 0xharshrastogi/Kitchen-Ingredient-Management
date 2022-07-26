import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from '../../ingredients/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.scss'],
})
export class RecipeInfoComponent implements OnInit {
  recipe: Recipe | undefined;

  constructor(private readonly route: ActivatedRoute, private readonly title: Title) {
    console.count('Recipe Info Const');
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: any) => {
      const recipe = data['recipe'];
      if (!recipe) return;
      this.recipe = recipe;
    });
  }

  onSelectIngredient(selectedIngredients: Ingredient[]) {
    console.log(selectedIngredients);
  }
}
