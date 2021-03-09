import { Injectable, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService {
  //this is used to save the current user whom we are displaying in profile page
  public currentProfile$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  public getUsers() {
    return this.http.get('https://reqres.in/api/users?page=2');
  }

  public getUserById(id: any) {
    return this.http.get('https://reqres.in/api/users/' + id);
  }
}
