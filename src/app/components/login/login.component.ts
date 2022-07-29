import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/http/authentication.service';
import { Credentials } from './../../services/http/authentication.service';

type LoginForm = {
  [key in keyof Credentials]: FormControl<string | null>;
};

const ERROR_MESSAGES: { [field: string]: { [errorName: string]: string } } = {
  ['name']: { ['required']: 'Username is required' },
  ['password']: { ['required']: 'Password is required' },
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginFg: FormGroup<LoginForm>;

  constructor(
    private readonly authenicationService: AuthenticationService,
    private readonly router: Router,
  ) {
    this.loginFg = new FormGroup<LoginForm>({
      ['name']: new FormControl(null, [Validators.required]),
      ['password']: new FormControl(null, [Validators.required]),
    });
  }

  get control() {
    return this.loginFg.controls;
  }

  canDisplayError(controlName: string) {
    const control = this.loginFg.get(controlName);
    if (!control) throw new Error(`${controlName} is not a valid control`);

    return control.invalid && (control.dirty || control.touched);
  }

  getErrorMessage(key: string): string {
    const errors = this.loginFg.get(key)?.errors;
    if (!errors) return 'INVALID CONTROL NAME ' + key;
    const error = ERROR_MESSAGES[key];
    return error ? error[Object.keys(errors)[0]] : 'NO ERROR MESSAGE FOUND FOR ' + key;
  }

  onSubmit() {
    console.log(this.loginFg);

    if (this.loginFg.invalid) {
      this.loginFg.markAllAsTouched();
      return;
    }

    this.authenicationService
      .login(<Credentials>this.loginFg.value)
      .then(() => this.router.navigate(['/recipe']))
      .catch((error) => console.log(error));
  }
}
