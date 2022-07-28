import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeHttpService } from './../../../services/http/recipe.service';
import { Recipe } from './../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipies: Recipe[] | undefined = [];
  subsciptions: Subscription[] = [];

  get recipeCount() {
    return this.recipies?.length ?? 0;
  }

  constructor(private readonly recipeHttpService: RecipeHttpService) {}

  ngOnInit(): void {
    this.recipeHttpService.getRecipes().subscribe((recipes) => {
      this.recipies = recipes;
    });

    this.handleRecipeCreate();
  }

  handleRecipeCreate() {
    const subscription = this.recipeHttpService.create.subscribe((recipe) =>
      this.recipies?.push(recipe)
    );
    this.subsciptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subsciptions.forEach((subscription) => subscription.unsubscribe());
  }
}
