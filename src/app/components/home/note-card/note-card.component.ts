import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit{
  constructor(private server: BackendService, private router: Router){}

  ngOnInit() {
    
  }

  @Input() selectedNote: any;

  

  editNote(note: Note){
    console.log("router test");
    this.server.setNote(note);
    this.router.navigate(['single-note']);
  }
}
