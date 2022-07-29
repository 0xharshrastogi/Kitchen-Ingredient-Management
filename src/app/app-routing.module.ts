import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsComponent } from './components/ingredients/ingredients.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { AuthenticationService } from './services/http/authentication.service';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Home',
  },
  {
    path: 'recipe',
    title: 'Recipes',
    component: RecipeComponent,
  },
  { path: 'ingredients', component: IngredientsComponent, title: 'Ingredients' },
  { path: 'login', component: LoginComponent, title: 'Login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private readonly authService: AuthenticationService) {}
}
