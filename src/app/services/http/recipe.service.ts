import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { Recipe } from 'src/app/components/recipe/recipe.model';
import { environment } from 'src/environments/environment';
import { Ingredient } from './../../components/ingredients/ingredient.model';

const baseUri = `${environment.basePath.server}`;

const toIngredient = (ingredientObj: Ingredient) => Ingredient.from(ingredientObj);

@Injectable({ providedIn: 'root' })
export class RecipeHttpService {
  create = new Subject<Recipe>();

  constructor(private readonly http: HttpClient) {}

  private mapToIngredients(recipe: Recipe): void {
    recipe.ingredients = recipe.ingredients.map(toIngredient);
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

  postRecipe(recipe: Recipe) {
    return this.http
      .post<Recipe>(`${baseUri}/recipe`, recipe)
      .pipe(tap((recipe) => (recipe.ingredients = recipe.ingredients.map(toIngredient))))
      .pipe(tap(() => this.create.next(recipe)));
  }
}
