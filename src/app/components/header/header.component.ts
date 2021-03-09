import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  users = [];

  constructor(public router: Router, public authService: AuthService) {}

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.authService.userLogged$.next(true);
    }
  }

  login() {
    this.router.navigate(['login']);
  }

  //on click of logout button, the token value is removed from the localstorage,
  //also publish false value to userLogged$ and then navigate to login page
  logout() {
    localStorage.removeItem('token');
    this.authService.userLogged$.next(false);
    this.router.navigate(['login']);
  }

  goToList() {
    this.router.navigate(['list']);
  }
}
