import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Sanitizer } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms'

import {AngularFireAuth} from '@angular/fire/auth';

import {ErrorStateMatcher} from '@angular/material/core';
import { fromEventPattern } from 'rxjs';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: firebase.User;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(

    private afAuth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.getUserLoggedIn().subscribe((user) => {
      this.user = user;

      if(this.user !== null) {
        this.router.navigate(['recipes'])
      }
    })
  }

  ngOnInit() {



  }

  onSubmit(user) {
    console.log('hey');
    console.log(user);
    this.authService.checkAuthentication(user)


  }

}
