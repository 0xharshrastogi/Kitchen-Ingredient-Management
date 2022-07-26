import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { RecipeCreateEditFormComponent } from './recipe-create-edit-form/recipe-create-edit-form.component';
import { RecipeInfoComponent } from './recipe-info/recipe-info.component';
import { RecipeNoneComponent } from './recipe-none/recipe-none.component';
import { RecipeComponent } from './recipe.component';
import { RecipeResolver } from './resolver/recipe.resolver';

const RECIPE_ROUTES: Routes = [
  {
    path: 'recipe',
    component: RecipeComponent,
    title: 'Recipes',
    children: [
      { path: 'recipe', component: RecipeNoneComponent },
      {
        path: 'create',
        component: RecipeCreateEditFormComponent,
        title: 'Create Recipe',
      },
      {
        path: ':recipeId',
        component: RecipeInfoComponent,
        resolve: { ['recipe']: RecipeResolver },
      },
      {
        path: ':recipeId/edit',
        component: RecipeCreateEditFormComponent,
        title: 'Edit Recipe',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(RECIPE_ROUTES)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
