import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private router: Router, private server: BackendService){}

  ngOnInit() {
    this.loggedInUser = this.server.getLoggedInUser();
  }
  
  loggedInUser!: User;
  

  logout(){
    this.router.navigate(['login']);
  }

}