import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { RecipeCreateEditFormComponent } from './recipe-create-edit-form/recipe-create-edit-form.component';
import { RecipeInfoComponent } from './recipe-info/recipe-info.component';
import { RecipeComponent } from './recipe.component';

const RECIPE_ROUTES: Routes = [
  {
    path: 'recipies',
    title: 'Recipes',
    component: RecipeComponent,
    children: [
      {
        path: 'create',
        component: RecipeCreateEditFormComponent,
        title: 'Create Recipe',
      },
      { path: ':recipeId', component: RecipeInfoComponent, title: 'Recipe [Name]' },
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
