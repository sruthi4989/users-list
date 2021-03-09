import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
    });
  }

  //when user logs in, we set the token to local storage and also publish the true value in userLogged$
  //and then navigate to list page.
  logIn() {
    this.authService.login(this.loginForm.value).subscribe((response: any) => {
      this.authService.userLogged$.next(true);
      localStorage.setItem('token', response.token);
      this.router.navigate(['list']);
    });
  }
}
