import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ActivationEnd,
} from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userForm: FormGroup;

  constructor(
    private usersService: UsersService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      first_name: '',
      last_name: '',
      email: '',
    });
  }

  ngOnInit() {
    //if current user is present in currentProfile$ then we do not go for a server end point,
    //otherwise we fire the endpoint and get the details from server
    this.usersService.currentProfile$.subscribe((user: any) => {
      if (user) {
        this.setCurrentUser(user);
      } else {
        const id = this.route.snapshot.params.id;
        this.usersService.getUserById(id).subscribe((user: any) => {
          this.setCurrentUser(user);
          this.usersService.currentProfile$.next(this.currentUser);
        });
      }
    });
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
    this.userForm.get('first_name')?.setValue(user.first_name);
    this.userForm.get('last_name')?.setValue(user.last_name);
    this.userForm.get('email')?.setValue(user.email);
  }
}
