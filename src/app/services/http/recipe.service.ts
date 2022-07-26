import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Recipe } from 'src/app/components/recipe/recipe.model';
import { environment } from 'src/environments/environment';
import { Ingredient } from './../../components/ingredients/ingredient.model';

const baseUri = `${environment.basePath.server}`;

@Injectable({ providedIn: 'root' })
export class RecipeHttpService {
  constructor(private readonly http: HttpClient) {}

  private mapToIngredients(recipe: Recipe): void {
    recipe.ingredients = recipe.ingredients.map((ingredientObj) =>
      Ingredient.from(ingredientObj)
    );
  }

  getRecipes() {
    return this.http
      .get<Recipe[]>(`${baseUri}/recipe`)
      .pipe(
        tap((recipies) => recipies.forEach((recipe) => this.mapToIngredients(recipe)))
      );
  }

  getRecipeById(id: string) {
    return this.http
      .get<Recipe | undefined>(`${baseUri}/recipe/${id}`)
      .pipe(tap((recipe) => recipe && this.mapToIngredients(recipe)));
  }
}
