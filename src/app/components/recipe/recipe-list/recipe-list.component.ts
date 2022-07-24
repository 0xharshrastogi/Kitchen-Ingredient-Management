import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipies: Recipe[] | undefined = [];

  get recipeCount() {
    return this.recipies?.length ?? 0;
  }

  private readonly recipeService: RecipeService;

  constructor(recipeService: RecipeService) {
    this.recipeService = recipeService;
  }

  ngOnInit(): void {
    this.recipies = this.recipeService.getRecipes();
  }
}
