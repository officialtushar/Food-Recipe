import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';


import {ErrorStateMatcher} from '@angular/material/core';
import { RecipesService } from 'src/app/services/recipes.service';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

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
    private authService: AuthService,
    private router: Router

  ) {
    this.user = JSON.parse(localStorage.getItem('token'));
    console.log('token exist',this.user);
    if(this.user !== null) {
      this.router.navigate(['recipes']);
    }
  }

  ngOnInit() {

  }
  onSubmit(user) {

    this.authService.setAuthentication(user);

  }

}
