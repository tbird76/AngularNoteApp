import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Note } from '../models/note';



@Injectable({
  providedIn: 'root',
})
export class BackendService {
  loggedInUser!: User;
  selectedNote!: Note | undefined;
  userURL = 'http://localhost:3000/users';
  noteURL = 'http://localhost:3000/notes';
  constructor(private http: HttpClient) {}

  async login(user: User){
    this.loggedInUser = user;
  }

  getLoggedInUser(): User{
    //console.log(this.loggedInUser);
    return this.loggedInUser;
  }

  setLoggedInUser(user: User) {
    this.loggedInUser = user;
  }

  registerUser(user: User) {
    return this.http.post(this.userURL, user);
    // .subscribe(data => {
    //   if (data) {
    //     this.loggedInUser = JSON.parse(JSON.stringify(user));
    //   }
    // })
  }

  updateUser(user: User){
    this.http.put(this.userURL + '/' + user.id, user).subscribe();
  }

  getUser(user: User){
    return this.getUsers().subscribe(data => {
      let value;
      for(let i=0; i<data.length; i++){
        if(user.username == data[i].username){
          value = data[i];
          return value;
        }
      }
    })
  }

  getUsers(): Observable<any> {
    return this.http.get(this.userURL);
  }

  getNotes(): Observable<any> {
    return this.http.get(this.noteURL);
  }

  checkUserExists(user: User) {
    let users: Observable<any> = this.getUsers();
    let userMatch = false;
    users.subscribe((data)=> {
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

  setNote(note: Note){
    this.selectedNote = JSON.parse(JSON.stringify(note));
  }

  updateNote(note: Note) {
    return this.http.put(this.noteURL + '/' + note.id, note).subscribe();
  }

  addNote(note: Note) {
    return this.http.post(this.noteURL, note).subscribe(data => {
      let temp = JSON.parse(JSON.stringify(data));
      temp.noteID = temp.id;
      this.http.put(this.noteURL + '/' + temp.id, temp).subscribe();
      console.log(temp.id);
    });
  }

  deleteNote(id: number) {
    return this.http.delete(this.noteURL + '/' + id).subscribe();
  }

}
