import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { AllNotesComponent } from './components/all-notes/all-notes.component';
import { SingleNoteComponent } from './components/single-note/single-note.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoteCardComponent } from './components/home/note-card/note-card.component';
import { NewNoteComponent } from './components/new-note/new-note.component';
import { NoteSearchPipe } from './pipes/note-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    AllNotesComponent,
    SingleNoteComponent,
    NoteCardComponent,
    NewNoteComponent,
    NoteSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
