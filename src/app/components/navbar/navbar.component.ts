import { Component } from '@angular/core';

type LinkDisplay = 'WHEN_NOT_AUTHENTICATED' | 'WHEN_AUTHENTICATED' | 'ALWAYS';
type Link = { name: string; path: string[] | string; display: LinkDisplay };

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  links: Link[] = [
    { name: 'Home', path: [''], display: 'ALWAYS' },
    { name: 'Recipies', path: ['/recipe'], display: 'WHEN_AUTHENTICATED' },
    { name: 'Ingredients', path: ['/ingredients'], display: 'WHEN_AUTHENTICATED' },
  ];

  constructor() {}
}
