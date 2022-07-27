import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsComponent } from './ingredients.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
@NgModule({
  declarations: [IngredientsComponent, IngredientFormComponent, IngredientListComponent],
  imports: [CommonModule, IngredientsRoutingModule, ReactiveFormsModule],
})
export class IngredientsModule {}
