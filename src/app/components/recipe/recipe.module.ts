import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RecipeCreateEditFormComponent } from './recipe-create-edit-form/recipe-create-edit-form.component';
import { RecipeInfoComponent } from './recipe-info/recipe-info.component';
import { RecipeListItemComponent } from './recipe-list/recipe-list-item/recipe-list-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';
import { RecipeNoneComponent } from './recipe-none/recipe-none.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeInfoComponent,
    RecipeCreateEditFormComponent,
    RecipeComponent,
    RecipeListItemComponent,
    RecipeNoneComponent,
  ],
  imports: [CommonModule, RecipeRoutingModule, SharedModule],
  exports: [RecipeComponent],
})
export class RecipeModule {}
