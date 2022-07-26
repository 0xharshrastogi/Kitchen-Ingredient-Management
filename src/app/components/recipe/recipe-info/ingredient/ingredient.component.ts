import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe-ingredients-handler',
  templateUrl: './ingredient.component.html',
})
export class IngredientsComponent {
  counter = 0;

  increase() {
    this.counter++;
  }
}
