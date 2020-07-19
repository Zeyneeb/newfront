import { Router } from '@angular/router';
import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Role } from '../Role';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 
  currentUser: User;

  constructor(private authentificationService: AuthenticationService, private router: Router) { }

  ngOnInit(){
    this.currentUser=this.authentificationService.currentUserValue;

    
  }

  logout() {
    this.authentificationService.logout();
    this.router.navigate(['/']);
}

  

}
