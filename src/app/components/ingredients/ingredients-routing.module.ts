import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsComponent } from './ingredients.component';

const routes: Routes = [
  { path: 'ingredients/:ingredientId/edit', component: IngredientsComponent },
  { path: 'ingredients', component: IngredientsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngredientsRoutingModule {}
