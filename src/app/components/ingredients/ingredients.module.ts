import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { IngredientServiceLocal } from 'src/app/services/ingredient.service';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { IngredientsComponent } from './ingredients.component';
@NgModule({
  declarations: [IngredientsComponent, IngredientFormComponent, IngredientListComponent],
  imports: [CommonModule, IngredientsRoutingModule, ReactiveFormsModule],
  providers: [IngredientServiceLocal],
})
export class IngredientsModule {}
