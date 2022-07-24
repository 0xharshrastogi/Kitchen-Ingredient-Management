import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeHttpService } from './../../../services/http/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolver implements Resolve<Recipe | undefined> {
  constructor(private readonly recipeHttpService: RecipeHttpService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Recipe | undefined> {
    const { recipeId } = route.params;
    return this.recipeHttpService.getRecipeById(recipeId);
  }
}
