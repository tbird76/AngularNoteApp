import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'
import { Note } from 'src/app/models/note';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})
export class NewNoteComponent implements OnInit{
  selectedNote: Note;
  constructor(private router: Router, private server: BackendService, private location: Location) {
    this.selectedNote = {
      title: '',
      body: '',
      dateCreated: new Date(),
      favorite: false
  }
  }
  
  ngOnInit(){
  }

  changeFavStatus(){
    if(this.selectedNote.favorite == true){
      this.selectedNote.favorite = false;
    }else{
      this.selectedNote.favorite = true;
    }
  }

  saveNote() {
    // let tempBody = <HTMLInputElement>document.getElementById('bodyArea');
    // this.selectedNote.body = tempBody.value;
    // let tempTitle = <HTMLInputElement>document.getElementById('titleArea');
    // this.selectedNote.title = tempTitle.value;
    // this.isEdit = false;
    // this.server.updateNote(this.selectedNote);
  }

  cancelSave() {
    // this.isEdit = false;
    this.location.back();
  }

  deleteNote() {
  //   if (confirm('Are you sure you want to delete this note?')) {
  //     this.server.deleteNote(this.selectedNote.id!);
  //     this.server.selectedNote = undefined;
  //     this.router.navigate(['home']);
  //   }
  }
}
