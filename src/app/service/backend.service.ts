import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

var loggedInUser;

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/users');
  }

  registerUser(user: any): Observable<any> {
    let result = this.http.post('http://localhost:3000/users', user);
    if(result){
      loggedInUser = this.getUser(user);
      this.http.post('http://localhost:3000/notes', user.username)
    }

    return result;
  }

  getUser(user: any): Observable<any>{
    return this.http.get('http://localhost:3000/users', user)
  }

}
