import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsComponent } from './components/ingredients/ingredients.component';

const routes: Routes = [
  {
    path: '',
    component: IngredientsComponent,
  },
  {
    path: 'recipe',
    title: 'Recipes',
    loadChildren: () =>
      import('./components/recipe/recipe.module').then((mod) => mod.RecipeModule),
  },
  { path: 'ingredients', component: IngredientsComponent, title: 'Ingredients' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
