import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/http/authentication.service';

type LinkDisplay = 'WHEN_NOT_AUTHENTICATED' | 'WHEN_AUTHENTICATED' | 'ALWAYS';
type Link = {
  name: string;
  path: string[] | string;
  showWhen: LinkDisplay;
};

const NAV_ROUTES: Link[] = [
  { showWhen: 'WHEN_AUTHENTICATED', name: 'Recipies', path: ['/recipe'] },
  { showWhen: 'WHEN_AUTHENTICATED', name: 'Ingredients', path: ['/ingredients'] },
  { showWhen: 'WHEN_NOT_AUTHENTICATED', name: 'Login', path: ['/login'] },
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  links: Link[] = [];

  get isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn;
  }

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.onAuthStatusChange();
    this.generateNavLinks();
  }

  display(displayStatus: LinkDisplay): boolean {
    switch (displayStatus) {
      case 'ALWAYS':
        return true;
      case 'WHEN_AUTHENTICATED':
      case 'WHEN_NOT_AUTHENTICATED':
        return this.authenticationService.isLoggedIn;
      default:
        return true;
    }
  }

  generateNavLinks() {
    this.links = NAV_ROUTES.filter((link) => {
      if (link.showWhen === 'ALWAYS') return true;

      if (link.showWhen === 'WHEN_AUTHENTICATED' && this.authenticationService.isLoggedIn)
        return true;
      if (
        link.showWhen === 'WHEN_NOT_AUTHENTICATED' &&
        !this.authenticationService.isLoggedIn
      )
        return true;
      return false;
    });
  }

  onAuthStatusChange() {
    this.authenticationService.update.subscribe(() => {
      this.generateNavLinks();
    });
  }

  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
