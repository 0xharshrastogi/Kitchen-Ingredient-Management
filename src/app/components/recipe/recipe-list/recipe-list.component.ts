import { Component, OnInit } from '@angular/core';
import { RecipeHttpService } from './../../../services/http/recipe.service';
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

  constructor(private readonly recipeHttpService: RecipeHttpService) {}

  ngOnInit(): void {
    this.recipeHttpService.getRecipes().subscribe((recipes) => {
      this.recipies = recipes;
    });
  }
}
