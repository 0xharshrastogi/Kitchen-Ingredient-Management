import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IngredientsModule } from './ingredients/ingredients.module';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RecipeModule } from './recipe/recipe.module';

@NgModule({
  declarations: [NavbarComponent, LoginComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RecipeModule,
    RouterModule,
    ReactiveFormsModule,
    IngredientsModule,
  ],
  exports: [NavbarComponent],
})
export class ComponentsModule {}
