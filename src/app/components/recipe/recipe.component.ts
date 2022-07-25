import { Component, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent {
  _navbarRef: HTMLElement | null = null;
  @Input() navbarSelector: string = '#navbar';

  constructor(private readonly router: Router, private readonly elementRef: ElementRef) {}

  get navbarElm(): HTMLElement {
    if (this._navbarRef) return this._navbarRef;

    const element: HTMLElement | null = document.querySelector(this.navbarSelector);

    if (!element)
      throw new Error(
        `Navbar Element Not Found In DOM With Selector [${this.navbarSelector}]`
      );

    this._navbarRef = element;
    return element;
  }

  calculateHeight() {
    return window.innerHeight - this.navbarElm.offsetHeight - 20;
  }
}
