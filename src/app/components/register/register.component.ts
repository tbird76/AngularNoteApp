import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  constructor(private fb: FormBuilder, private server: BackendService, private router: Router) {}

  ngOnInit(): void {
  }

  passwordError: any;
  

    registerForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8), this.passwordMissingLowerCaseValidator, this.passwordMissingCapitalCaseValidator, this.passwordMissingNumberValidator, this.passwordMissingSpecialCharacterValidator, this.passwordHasSpaceValidator]], //, Validators.pattern('^[a-zA-Z0-9!@#$%^&*]+$')
    confirmPassword: ['', [Validators.required]]
  },{
    validators: this.confirmPasswordValidator()
  })

  confirmPasswordValidator(): ValidatorFn {
    return(control:AbstractControl): ValidationErrors =>{
      let error;

      if(control.value.password != control.value.confirmPassword){
        error = {"passwordMismatchError": true}
      }

      return error!;
    }
  }

  passwordMissingLowerCaseValidator(control: AbstractControl){
      let error;

      if(!(/^.*[a-z].*$/.test(control.value))){
        error = ({"passwordMissingLowerCase": true});
      }

      return error;
  }

  passwordMissingCapitalCaseValidator(control: AbstractControl){
      let error;
      
      if(!(/^.*[A-Z].*$/.test(control.value))){
        error = ({"passwordMissingCapitalCase": true});
      }

      return error;
  }

  passwordMissingNumberValidator(control: AbstractControl){
      let error;
      
      if(!(/\d/.test(control.value))){
        error = ({"passwordMissingNumber": true});
      }

      return error;
  }

  passwordMissingSpecialCharacterValidator(control: AbstractControl){
      let error;
      
      if(!(/^.*[!@#$%^&*].*$/.test(control.value))){
        error = ({"passwordMissingSpecialCharacter": true}); //continue here
      }

      return error;
  }

  passwordHasSpaceValidator(control: AbstractControl){
      let error;
      
      if(/\s/.test(control.value)){
        error = ({"passwordHasSpace": true});
      }

      return error;
  }

  get f() {
    return this.registerForm.controls;
  }

  //search through the custom validation errors to check if the passwords match.
  get getConfirmPassword() {
    let mismatch = false;
    if(this.registerForm.errors){
      Object.keys(this.registerForm.errors).forEach(element => {
        console.log('Element: ' + element);
        if(element == 'passwordMismatchError'){
          mismatch = true;
        }
      });
    }

    return mismatch;
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  checkUserExists(user: User) {
    let userMatch = false;
    this.server.getUsers().subscribe((data)=> {
      for(let i=0; i<data.length; i++){
        // console.log('User list: ' + data[i].username);
        // console.log('User: ' + user.username);
        // console.log(data[i].username == user.username);
        if(data[i].username == user.username){
          userMatch = true;
          // console.log('test: ' + userMatch);
          break;
        }
      }
    })

    // console.log('Username Match: ' + userMatch);
    return userMatch;
  }

  


  async register(){
    let user: any = {
      username: this.f.username.value,
      password: this.f.password.value
    }
    let uniqueUserName = false;

    console.log('register user check');
    console.log(this.checkUserExists(user));
    if(this.checkUserExists(user)){
      alert("Username is already taken, please select a different username");
      // uniqueUserName = false;
    }else{
      this.server.registerUser(user).subscribe(query => {
        if(query){
          alert("Welcome " + user.username);
          this.router.navigate(['home']);
        }else {
          alert("Post was unable to complete");
        }
      })
    }
  }
}
