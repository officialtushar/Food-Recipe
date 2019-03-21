import { Component, OnInit } from '@angular/core';

import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Food-Recipe';

  user: firebase.User;

  constructor(
    private afAuth: AngularFireAuth
  ) {

  }

  ngOnInit() {
    this.afAuth.authState.subscribe((user) => {
      console.log(user);
      this.user = user;
    })
  }
}
