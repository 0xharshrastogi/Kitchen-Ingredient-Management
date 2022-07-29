import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ingredient } from './../../components/ingredients/ingredient.model';

const BASEURI = environment.basePath.server;
type IngredientObj = { name: string; quantity: number };

@Injectable({ providedIn: 'root' })
export class IngredientHttpService {
  constructor(private readonly http: HttpClient) {}

  getIngredients() {
    return this.http
      .get<IngredientObj[]>(`${BASEURI}/ingredients`)
      .pipe(
        map((values) => values.map((value) => new Ingredient(value.name, value.quantity)))
      );
  }

  getIngredientById(id: string) {
    return this.http
      .get<IngredientObj>(`${BASEURI}/ingredients/${id}`)
      .pipe(map((value) => new Ingredient(value.name, value.quantity)));
  }

  postIngredient(ingredient: Ingredient) {
    return this.http.post(`${BASEURI}/ingredients`, ingredient);
  }

  postIngredients(ingredients: Ingredient[]) {
    return this.http.post(`${BASEURI}/ingredients`, ingredients);
  }

  deleteIngredient<T>(ingredientId: string): Observable<T>;
  deleteIngredient<T>(ingredient: Ingredient): Observable<T>;
  deleteIngredient<T>(value: unknown): Observable<T> {
    let id: string;

    if (typeof value === 'string') id = value;
    else if (value instanceof Ingredient) id = value.id;
    else throw new Error('Ingredient must be a string or an instance of Ingredient');

    return this.http.delete<T>(`${BASEURI}/ingredients/${id}`);
  }

  updateIngredient(id: string, updateInfo: Partial<Ingredient>): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${BASEURI}/ingredients/${id}`, updateInfo);
  }
}
