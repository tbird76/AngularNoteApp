import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note';
import { User } from 'src/app/models/user';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private router: Router, private server: BackendService) {
    this.loggedInUser = this.server.loggedInUser;
  }
  allNotesList: Array<any> = [];
  favoritesNotesList: Array<any> = [];
  mostRecentList: Array<any> = [];
  loggedInUser: User;

  ngOnInit(){
    this.allNotes();
  }

  allNotes() {
    this.server.getNotes().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].userID == this.loggedInUser.userID) {
          this.allNotesList.push(JSON.parse(JSON.stringify(data[i])))
        }
      }
      this.favNotes();
      this.recentNotes();
    })
  }

  favNotes(){
    for(let i=0; i<this.allNotesList.length; i++){
      if(this.allNotesList[i].favorite == true){
        this.favoritesNotesList.push(this.allNotesList[i]);
      }
    }
  }

  recentNotes(){
    let temp: Array<any> = JSON.parse(JSON.stringify(this.allNotesList));
    temp.sort(function(a, b) {
      if(a.dateCreated > b.dateCreated)
        return -1;
      else if(a.dateCreated < b.dateCreated)
        return 1;
      else
        return 0;
    });

    for(let i=0; i<3; i++){
      this.mostRecentList.push(JSON.parse(JSON.stringify(temp[i])));
    }
  }

  editNote(note: Note){
    console.log("router test");
    this.server.setNote(note);
    this.router.navigate(['single-note']);
  }

  editNote2() {
    this.router.navigate(['login'])
  }

}
