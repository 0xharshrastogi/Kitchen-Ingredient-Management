import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from './../ingredient.model';

const NAME = 'name';
const QUANTITY = 'quantity';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
})
export class IngredientFormComponent implements OnInit {
  @Output() ingredientCreate = new EventEmitter<Ingredient>();

  editIngredientId: string | undefined;

  isEditMode: boolean = false;

  ingredientFg: FormGroup<{
    name: FormControl<string | null>;
    quantity: FormControl<number | null>;
  }>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly ingredientService: IngredientService,
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

    this.ingredientCreate.emit(ingredient);
    this.reset();
  }

  reset() {
    this.ingredientFg.reset();
    this.isEditMode = false;
    this.editIngredientId = undefined;
  }

  onSaveEditChanges() {
    this.ingredientService.update(
      this.editIngredientId!,
      <Partial<Ingredient>>this.ingredientFg.value
    );
    this.reset();
    this.router.navigate(['ingredients']);
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(map((param) => param.get('ingredientId')))
      // .pipe(map((ingredientId) => ingredientId))
      .subscribe((ingredientId) => {
        console.log(ingredientId);
        if (!ingredientId) return;

        const ingredient = this.ingredientService.get(ingredientId);
        if (!ingredient) return;

        this.editIngredientId = ingredientId;
        this.isEditMode = true;
        this.ingredientFg.setValue({
          name: ingredient.name,
          quantity: ingredient.quantity,
        });
      });
  }
}
