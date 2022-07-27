import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ingredient } from './../ingredient.model';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
  styleUrls: ['./ingredient-list.component.scss'],
})
export class IngredientListComponent {
  @Output() delete = new EventEmitter<Ingredient>();

  @Input() ingredients!: Ingredient[];

  constructor() {}
}
