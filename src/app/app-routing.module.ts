import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { RecipeComponent } from './components/recipe/recipe.component';

const routes: Routes = [
  {
    path: '',
    component: IngredientsComponent,
  },
  {
    path: 'recipe',
    title: 'Recipes',
    component: RecipeComponent,
  },
  { path: 'ingredients', component: IngredientsComponent, title: 'Ingredients' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
