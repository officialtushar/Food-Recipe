import { ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';
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
    private route: ActivatedRoute,
  ) {



    let routeRedirect = this.route.snapshot.paramMap.get('route');

    console.log('signup snapshot',routeRedirect);

    if(routeRedirect === null) {
      this.user = JSON.parse(localStorage.getItem('token'));
      console.log('token exist',this.user);
      if(this.user !== null) {
        if(this.user) {
          this.router.navigate(['recipes']);
        }
      }
    }


    // console.log('token exist',JSON.parse(localStorage.getItem('token')));


  }

  ngOnInit() {



  }

  onSubmit(user) {
    console.log('hey');
    console.log(user);
    this.authService.checkAuthentication(user)


  }

}
