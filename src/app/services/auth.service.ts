import { Injectable } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}



  setAuthentication(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        return result;

      })
      .catch((err) => {
        console.log(err);
      })
  }

  checkAuthentication(user) {
    this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password)
    .then((result) => {
      console.log(result);
      return result

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
       return result
     })
     .catch((err) => {
       console.log(err);
     });
   }
}
