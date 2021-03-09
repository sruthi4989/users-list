import { Injectable, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  //used to determin if the user is logged in or not
  public userLogged$ = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  public login(request: any): any {
    return this.http.post('https://reqres.in/api/login', request);
  }

  public logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
  }
}
