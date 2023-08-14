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
        if(data[i].username == user.username){
          userMatch = true;
          break;
        }
      }
    })

    return userMatch;
  }

  


  async register(){
    let user: any = {
      username: this.f.username.value,
      password: this.f.password.value
    }
    let uniqueUserName = true;

    this.server.getUsers().subscribe((data: any) => {
      console.log(JSON.stringify(data));
      for(let i=0; i<data.length; i++){
        if(data[i].username == user.username){
          alert("Username is already taken, please select a different username");
          uniqueUserName = false;
          break;
        }
      }
      if (uniqueUserName) {
        this.server.registerUser(user).subscribe(query => {
          console.log(query);
          if (query) {
            let temp = JSON.parse(JSON.stringify(query))
            temp.userID = temp.id;
            this.server.loggedInUser = JSON.parse(JSON.stringify(temp));
            this.server.updateUser(temp);
            alert("Welcome " + user.username);
            this.router.navigate(['home']);
          } else {
            alert("Post was unable to complete");
          }
        })
      }
    })
  }
}
