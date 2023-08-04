import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private server: BackendService,
    private router: Router
  ) {}
  loginResult = {
    usernameNotFound: false,
    passwordMismatch: false,
    loginSuccessful: false,
  };

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    let body: User = {
      username: this.username,
      password: this.password,
    };

    this.server.getUsers().subscribe((users) => {
      for (let i = 0; i < users.length; i++) {
        if (users[i].username != body.username) {
          this.loginResult.usernameNotFound = true;
        } else {
          this.loginResult.usernameNotFound = false;
          if (users[i].password != body.password) {
            this.loginResult.passwordMismatch = true;
            break;
          } else {
            this.loginResult.passwordMismatch = false;
            this.loginResult.loginSuccessful = true;
            this.router.navigate(['home']);
            break;
          }
        }
      }
    });
  }

  get username(): string {
    let user_name = this.loginForm.get('username')!.value;
    if (user_name) {
      return user_name;
    } else return '';
  }

  get password() {
    let pass = this.loginForm.get('password')!.value;
    if (pass) return pass;
    else return '';
  }
}
