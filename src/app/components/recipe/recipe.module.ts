import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RecipeCreateEditFormComponent } from './recipe-create-edit-form/recipe-create-edit-form.component';
import { RecipeInfoComponent } from './recipe-info/recipe-info.component';
import { RecipeIngredientsComponent } from './recipe-info/recipe-ingredients/recipe-ingredients.component';
import { RecipeListItemComponent } from './recipe-list/recipe-list-item/recipe-list-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeNoneComponent } from './recipe-none/recipe-none.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeInfoComponent,
    RecipeCreateEditFormComponent,
    RecipeComponent,
    RecipeListItemComponent,
    RecipeNoneComponent,
    RecipeIngredientsComponent,
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
  ],
  exports: [RecipeComponent],
})
export class RecipeModule {}
