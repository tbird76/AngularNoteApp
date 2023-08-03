import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http;';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any>{
    return this.http.get('http://localhost:3000/users')
  }
}
