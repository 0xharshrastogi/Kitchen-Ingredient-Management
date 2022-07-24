import { Injectable } from '@angular/core';
import { Recipe } from './../components/recipe/recipe.model';

const pizza = new Recipe('Pizza');
pizza.imageUri =
  'https://www.simplyrecipes.com/thmb/RheeF949ewwGy7pxQQNt5v63Oi0=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1c-c2b1885d27d4481c9cfe6f6286a64342.jpg';
pizza.description =
  'Pizza is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients, which is then baked at a high temperature, traditionally in a wood-fired oven.';
pizza.id = '1';

const recipe2 = new Recipe('Sunnundalu Recipe | Urad Dal Laddu');
recipe2.description =
  'Of the various Ladoo variants that get made with different lentils or dals, this Sunnundalu or Urad Dal Laddu from the Andhra Cuisine is seriously a good one. Not because it is tasty and fairly easy to make, but also because this is one of those recipes where you can use black gram (urad dal) to make a lovely sweet. All you need is urad dal, ghee and sugar to make Sunnundalu recipe. The unique Urad Dal Laddu is also perfect for times when you suddenly have a snack craving!';
recipe2.imageUri =
  'https://www.vegrecipesofindia.com/wp-content/uploads/2016/08/urad-dal-ladoo.jpg';

recipe2.id = `2`;

const RECIPES: Recipe[] = [pizza, recipe2];

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipies = RECIPES;

  getRecipes(): Recipe[] {
    return this.recipies;
  }

  getRecipeById(id: string): Recipe | undefined {
    return this.getRecipes().find((recipe) => recipe.id === id);
  }
}
