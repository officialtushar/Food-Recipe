import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';
import { Router } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Food-Recipe';

  user: firebase.User;
  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
  ) {

      this.authService.getUserLoggedIn().subscribe((user) => {
        this.user = user;
        if(this.user) {
          localStorage.setItem('token', JSON.stringify(this.user));
        }
        else {
          localStorage.setItem('token', null);
        }
      })

  }

  ngOnInit() {

  }
}
