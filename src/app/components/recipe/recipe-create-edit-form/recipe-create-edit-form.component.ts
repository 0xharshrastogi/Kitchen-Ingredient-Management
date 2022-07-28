import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { Recipe } from 'src/app/components/recipe/recipe.model';
import { RecipeHttpService } from 'src/app/services/http/recipe.service';
import { Ingredient } from './../../ingredients/ingredient.model';

type RecipeProp = Pick<Recipe, 'title' | 'description' | 'imageUri' | 'ingredients'>;
type IngredientProp = Pick<Ingredient, 'name' | 'quantity'>;

type IngredientFormGroup = {
  [key in keyof IngredientProp]: FormControl<
    (key extends 'name' ? string : number) | null
  >;
};

type RecipeFormGroup = {
  [key in keyof RecipeProp]: key extends 'ingredients'
    ? FormArray
    : FormControl<Recipe[key] | null>;
};

@Component({
  selector: 'app-recipe-create-edit-form',
  templateUrl: './recipe-create-edit-form.component.html',
  styleUrls: ['./recipe-create-edit-form.component.scss'],
})
export class RecipeCreateEditFormComponent implements OnInit {
  recipeFg: FormGroup<RecipeFormGroup>;

  constructor(
    private readonly recipeHttpService: RecipeHttpService,
    private readonly router: Router
  ) {
    this.recipeFg = new FormGroup<RecipeFormGroup>({
      ['title']: new FormControl(null, [Validators.required]),
      ['imageUri']: new FormControl(null, [Validators.required]),
      ['description']: new FormControl(null, [Validators.required]),
      ['ingredients']: new FormArray<any>([]),
    });
  }

  getControl(key: keyof RecipeFormGroup) {
    return this.recipeFg.get(key);
  }

  ngOnInit(): void {
    this.getControl('imageUri')
      ?.valueChanges.pipe(debounceTime(800))
      .subscribe((data) => console.log(data));
  }

  createIngredientFg(defaultValue?: IngredientProp) {
    return new FormGroup<IngredientFormGroup>({
      ['name']: new FormControl(defaultValue?.name ?? null, [Validators.required]),
      ['quantity']: new FormControl(defaultValue?.quantity ?? null, [
        Validators.required,
      ]),
    });
  }

  onAddIngredient() {
    const emptyIngredientFG = this.createIngredientFg();
    this.recipeFg.controls.ingredients.push(emptyIngredientFG);
  }

  handleCreate() {
    const { ingredients, ...value } = <RecipeProp>this.recipeFg.value;
    const recipe = new Recipe(value.title);

    recipe.description = value.description;
    recipe.imageUri = value.imageUri;
    recipe.ingredients = ingredients.map(
      ({ name, quantity }) => new Ingredient(name, quantity)
    );
    this.recipeHttpService
      .postRecipe(recipe)
      .subscribe((recipe) => this.router.navigate(['/recipe', recipe.id]));
  }

  onSubmit() {
    this.handleCreate();
  }
}
