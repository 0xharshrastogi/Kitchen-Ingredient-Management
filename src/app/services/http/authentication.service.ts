import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subject } from 'rxjs';
import { LocalStorageService } from '../localStorage.service';
import { LoginComponent } from './../../components/login/login.component';
import { RecipeComponent } from './../../components/recipe/recipe.component';

const BASEURI = 'http://localhost:8080';
export type Credentials = { name: string; password: string };

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  isLoggedIn: boolean = false;

  update = new Subject<boolean>();

  constructor(
    private readonly http: HttpClient,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
  ) {}

  login(credentials: Credentials) {
    return new Promise<void>((resolve, reject) => {
      this.http
        .get<Credentials[]>(`${BASEURI}/user`, { params: { name: credentials.name } })
        .pipe(map((values) => values[0]))
        .subscribe((serverCredential) => {
          try {
            this.isLoggedIn = serverCredential.password === credentials.password;
            this.localStorageService.set('credentials', serverCredential);
            this.update.next(true);
            resolve();
          } catch (error) {
            this.isLoggedIn = false;
            this.update.next(false);
            reject(error);
          } finally {
            this.registerHomeComponent();
          }
        });
    });
  }

  registerHomeComponent() {
    const route = this.router.config.find((componentRoute) => componentRoute.path === '');
    if (!route) return;
    route.component = this.isLoggedIn ? RecipeComponent : LoginComponent;
    console.log(route);
  }

  logout() {
    this.isLoggedIn = false;
    this.localStorageService.remove('credentials');
    this.update.next(false);
    this.registerHomeComponent();
  }

  autoLogin() {
    const credentials = this.localStorageService.get<Credentials>('credentials');
    if (!credentials) return;

    this.login(credentials);
  }
}
