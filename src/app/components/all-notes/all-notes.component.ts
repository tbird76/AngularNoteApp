import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note';
import { User } from 'src/app/models/user';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.css']
})
export class AllNotesComponent implements OnInit{
  loggedInUser: User;
  allNotes: Note[] = [];
  searchQuery: any = '';

  constructor(private router: Router, private server: BackendService) {
    this.loggedInUser = JSON.parse(JSON.stringify(this.server.loggedInUser));
    this.getAllNotes();
  }

  ngOnInit(){
  }

  getAllNotes() {
    this.server.getNotes().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].userID == this.loggedInUser.userID) {
          this.allNotes.push(JSON.parse(JSON.stringify(data[i])))
        }
      }
    })
  }

  newNote() {
    this.router.navigate(['new-note'])
  }

}
