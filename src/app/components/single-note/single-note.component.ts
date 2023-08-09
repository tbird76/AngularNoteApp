import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-single-note',
  templateUrl: './single-note.component.html',
  styleUrls: ['./single-note.component.css']
})
export class SingleNoteComponent implements OnInit{
  selectedNote!: Note;
  isEdit: boolean;
  constructor(private router: Router, private server: BackendService) {
    this.isEdit = false;
    this.selectedNote = JSON.parse(JSON.stringify(this.server.selectedNote));
  }
  ngOnInit(): void {
    // this.selectedNote = {
    //   "title": "Grocery",
    //   "body": "Bread, Milk, Cheese",
    //   "dateCreated": new Date('2023-08-08T14:54:55.072Z'),
    //   "favorite": true,
    //   "noteID": 1,
    //   "userID": 1,
    //   "id": 1
    // }
  }

  changeFavStatus(){
    console.log(new Date().toDateString())
    console.log(new Date().toISOString())
    if(this.selectedNote.favorite == true){
      this.selectedNote.favorite = false;
    }else{
      this.selectedNote.favorite = true;
    }
  }

  editNote() {
    this.isEdit = true;
  }

  saveNote() {
    let tempBody = <HTMLInputElement>document.getElementById('bodyArea');
    this.selectedNote.body = tempBody.value;
    let tempTitle = <HTMLInputElement>document.getElementById('titleArea');
    this.selectedNote.title = tempTitle.value;
    this.isEdit = false;
    this.server.updateNote(this.selectedNote);
    // console.log(JSON.stringify(this.selectedNote));
  }

  cancelSave() {
    this.isEdit = false;
  }

  deleteNote() {
    if (confirm('Are you sure you want to delete this note?')) {
      this.server.deleteNote(this.selectedNote.id!);
      this.server.selectedNote = undefined;
      this.router.navigate(['home']);
    }
  }

}
