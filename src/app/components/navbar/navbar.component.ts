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
    { name: 'Recipies', path: ['/recipies'], display: 'WHEN_AUTHENTICATED' },
    { name: 'Shopping List', path: ['/shopping_list'], display: 'WHEN_AUTHENTICATED' },
  ];

  constructor() {}
}
