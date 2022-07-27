import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { exhaustMap, map, of } from 'rxjs';
import { IngredientHttpService } from 'src/app/services/http/ingredient.service';
import { IngredientServiceLocal } from 'src/app/services/ingredient.service';
import { Ingredient } from './../ingredient.model';

const NAME = 'name';
const QUANTITY = 'quantity';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
})
export class IngredientFormComponent implements OnInit {
  editIngredientId: string | undefined;

  isEditMode: boolean = false;

  ingredientFg: FormGroup<{
    name: FormControl<string | null>;
    quantity: FormControl<number | null>;
  }>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly ingredientLocalService: IngredientServiceLocal,
    private readonly ingredientHttpService: IngredientHttpService,
    private readonly router: Router
  ) {
    this.ingredientFg = new FormGroup({
      [NAME]: new FormControl<string | null>(null, [Validators.required]),
      [QUANTITY]: new FormControl<number | null>(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
    });
  }

  onSubmit() {
    if (this.ingredientFg.invalid) throw new Error('Ingredient Form Is Invalid');

    const ingredient = new Ingredient(
      this.ingredientFg.value[NAME]!,
      this.ingredientFg.value[QUANTITY]!
    );

    this.ingredientHttpService.postIngredient(ingredient).subscribe({
      next: () => {
        this.ingredientLocalService.add(ingredient);
        this.reset();
      },
      error: (error: Error | undefined) => alert(error?.message),
    });
  }

  reset() {
    this.ingredientFg.reset();
    this.isEditMode = false;
    this.editIngredientId = undefined;
  }

  onSaveEditChanges() {
    this.ingredientHttpService
      .updateIngredient(
        this.editIngredientId!,
        <Partial<Ingredient>>this.ingredientFg.value
      )
      .subscribe(() => {
        console.log(this.editIngredientId, this.ingredientFg.value);
        this.ingredientLocalService.update(
          this.editIngredientId!,
          <Partial<Ingredient>>this.ingredientFg.value
        );
        this.reset();
        this.router.navigate(['ingredients']);
      });
  }

  ngOnInit(): void {
    const fetchIngredient$ = exhaustMap((id: string | null) =>
      id ? this.ingredientHttpService.getIngredientById(id) : of(null)
    );
    this.route.paramMap
      .pipe(map((param) => param.get('ingredientId')))
      .pipe(fetchIngredient$)
      .subscribe((ingredient) => {
        if (!ingredient) return;

        this.editIngredientId = ingredient.id;
        this.isEditMode = true;
        this.ingredientFg.setValue({
          name: ingredient.name,
          quantity: ingredient.quantity,
        });
      });
  }
}
