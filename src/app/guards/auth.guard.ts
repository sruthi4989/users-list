import { Injectable, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  //checks from the local storage if the token is present or not,
  //if present it will allow the route.
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
