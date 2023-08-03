import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

var loggedInUser;

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  login(){
    let users = this.http.get('http://localhost:3000/users')
    

    return false;
  }
}
