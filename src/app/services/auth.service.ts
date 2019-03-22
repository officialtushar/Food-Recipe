import { RecipesService } from 'src/app/services/recipes.service';
import { Injectable } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";


@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private recipeService: RecipesService,

    ) {}



  setAuthentication(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        // return result;
        if(result.user.uid) {
          this.recipeService.openSnackbar('Signup Success');
          this.router.navigate(['login', {route: 'signup'} ])
        }

      })
      .catch((err) => {
        console.log(err);
      })
  }

  checkAuthentication(user) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
    .then((result) => {
      console.log(result.user.uid);
      if(result.user.uid) {
        this.recipeService.openSnackbar('Login Success');
        this.router.navigate(['recipes']);
      }

    })
    .catch((err) => {
      console.log(err);
    })
  }

   getUserLoggedIn() {
     return this.afAuth.authState;
    //   this.afAuth.authState.subscribe((user) => {
    //    console.log('User is service', user);
    //  });
   }

   logout() {
     this.afAuth.auth.signOut()
     .then((result) => {
      //  console.log('logout',result);
      localStorage.removeItem('token');
       this.router.navigate(['login'])

     }).catch(err => {
       console.log(err);
     })
   }
}
