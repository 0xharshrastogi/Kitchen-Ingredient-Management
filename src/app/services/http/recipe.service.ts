import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/components/recipe/recipe.model';
import { environment } from 'src/environments/environment';

const baseUri = `${environment.basePath.server}`;

@Injectable({ providedIn: 'root' })
export class RecipeHttpService {
  constructor(private readonly http: HttpClient) {}

  getRecipes() {
    return this.http.get<Recipe[]>(`${baseUri}/recipe`);
  }

  getRecipeById(id: string) {
    return this.http.get<Recipe | undefined>(`${baseUri}/recipe/${id}`);
  }
}
