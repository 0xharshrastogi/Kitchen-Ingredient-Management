import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IngredientHttpService } from 'src/app/services/http/ingredient.service';
import { IngredientServiceLocal } from './../../../services/ingredient.service';
import { Ingredient } from './../ingredient.model';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
})
export class IngredientListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private readonly ingredientHttpService: IngredientHttpService,
    private readonly ingredientLocalService: IngredientServiceLocal
  ) {}

  get ingredients() {
    return this.ingredientLocalService.ingredients;
  }

  ngOnInit(): void {
    this.ingredientHttpService
      .getIngredients()
      .subscribe((ingredients) =>
        ingredients.forEach((ingredient) => this.ingredientLocalService.add(ingredient))
      );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onDelete(ingredient: Ingredient): void {
    this.ingredientHttpService.deleteIngredient(ingredient).subscribe({
      next: () => {
        this.ingredientLocalService.remove(ingredient.id);
        console.log(this.ingredientLocalService.ingredients);
      },
    });
  }
}
