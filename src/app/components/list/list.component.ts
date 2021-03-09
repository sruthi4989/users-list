import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users: any = [];

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((response: any) => {
      console.log(response);
      this.users = response.data;
    });
  }

  //when clicking on the user we save that user details in currentProfile$
  goToProfile(user: any) {
    console.log(user);
    this.userService.currentProfile$.next(user);
    this.router.navigate(['profile', user.id]);
  }
}
