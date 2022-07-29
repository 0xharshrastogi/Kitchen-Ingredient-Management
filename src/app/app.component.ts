import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/http/authentication.service';
import { LocalStorageService } from './services/localStorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [],
})
export class AppComponent implements OnInit {
  private readonly localStorageService!: LocalStorageService;

  private readonly authenticationService!: AuthenticationService;

  constructor(
    localStorageService: LocalStorageService,
    authenticationService: AuthenticationService,
  ) {
    this.authenticationService = authenticationService;
    this.localStorageService = localStorageService;
  }

  ngOnInit(): void {
    this.authenticationService.autoLogin();
  }
}
