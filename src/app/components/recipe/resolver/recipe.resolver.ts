import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeResolver implements Resolve<Recipe | undefined> {
  constructor(private readonly recipeService: RecipeService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe | undefined> {
    const { recipeId } = route.params;
    console.log(recipeId);
    const recipe = this.recipeService.getRecipeById(recipeId);
    console.log(recipe);
    return of(recipe);
  }
}
