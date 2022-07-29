import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, map } from 'rxjs';
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

const removeKeys = (obj: { [key: string]: any }, keys: string[]) => {
  keys.forEach((key) => delete obj[key]);
  return obj;
};

@Component({
  selector: 'app-recipe-create-edit-form',
  templateUrl: './recipe-create-edit-form.component.html',
  styleUrls: ['./recipe-create-edit-form.component.scss'],
})
export class RecipeCreateEditFormComponent implements OnInit {
  recipeFg: FormGroup<RecipeFormGroup>;
  isEditMode: boolean = false;
  previousRecipe?: Recipe;

  constructor(
    private readonly recipeHttpService: RecipeHttpService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
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
    this.isEditMode = this.route.snapshot.data['isEditMode'];

    if (this.isEditMode) {
      this.handleEditMode();
    }

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

  handleEditMode() {
    this.route.data.pipe<Recipe>(map((data) => data['recipe'])).subscribe((recipe) => {
      this.previousRecipe = recipe;
      const ingredients = recipe.ingredients;
      const value: any = removeKeys({ ...recipe }, ['id', 'isVegitarian', 'ingredients']);

      this.recipeFg.setValue({ ...value, ingredients: [] });
      for (const ingredient of ingredients) {
        this.recipeFg.controls.ingredients.push(this.createIngredientFg(ingredient));
      }
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

  handleEdit() {
    const { value } = this.recipeFg;

    const recipe = new Recipe(value.title!);

    recipe.id = this.previousRecipe!.id;
    recipe.description = value.description!;
    recipe.imageUri = value.imageUri!;
    recipe.ingredients = value.ingredients.map(
      ({ name, quantity }: IngredientProp) => new Ingredient(name, quantity)
    );

    this.recipeHttpService
      .editRecipe(recipe)
      .subscribe(() => this.router.navigate(['/recipe', recipe.id]));
  }

  onSubmit() {
    if (this.isEditMode) this.handleEdit();
    else this.handleCreate();
  }
}
