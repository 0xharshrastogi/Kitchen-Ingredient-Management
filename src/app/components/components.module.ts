import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IngredientsModule } from './ingredients/ingredients.module';
import { NavbarComponent } from './navbar/navbar.component';
import { RecipeModule } from './recipe/recipe.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RecipeModule,
    RouterModule,
    IngredientsModule,
  ],
  exports: [NavbarComponent],
})
export class ComponentsModule {}
