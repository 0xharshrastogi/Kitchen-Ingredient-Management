import { NgModule } from '@angular/core';
import { RecipeCreateEditFormComponent } from './recipe-create-edit-form/recipe-create-edit-form.component';
import { RecipeInfoComponent } from './recipe-info/recipe-info.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeInfoComponent,
    RecipeCreateEditFormComponent,
    RecipeComponent,
  ],
  imports: [RecipeRoutingModule],
  exports: [RecipeComponent],
})
export class RecipeModule {}
