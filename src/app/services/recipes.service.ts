import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { map } from "rxjs/operators";
import {  Observable, throwError} from "rxjs";
import { catchError } from 'rxjs/operators';

import { MatSnackBar } from "@angular/material";
import {environment} from '../../environments/environment.dev';

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  options: any;
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private router: Router
    ) {
    const header = new Headers({ "Content-Type": "application/json" });
    this.options = header;
  }

  getRecipes() {
    // console.log('get order');
    console.log(environment.dev_url)

    return this.http.get( environment.dev_url + 'recipes').pipe(
      map(res => {
        console.log("getting the data", res);
        return res;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  private handleError(err :HttpErrorResponse) {
    console.log(err);
  }

  getSpecificRecipe(recipeId) {
    // console.log('get order');

    return this.http.get(environment.dev_url +  'recipes/' + recipeId).pipe(
      map(res => {

        if( res['kind'] !== 'ObjectId') {
          return res
        }
        if(res['kind'] === 'ObjectId') {
          this.router.navigate(['recipes']);
          return {data: false}
        }
      }),
      catchError((error) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  updateRecipe(recipeId,payload) {

    console.log(recipeId);
    console.log('payload',payload);

    return this.http.put(environment.dev_url +  'recipes/' + recipeId, payload).pipe(
      map(res => {
        return res;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  deleteRecipe(recipeId) {
    console.log(recipeId);
    // console.log('payload',payload);
    return this.http.delete(environment.dev_url +  'recipes/').pipe(
      map(res => {
        return res;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  addRecipe(payload) {
    return this.http.post(environment.dev_url +  'recipes', payload).pipe(
      map(res => {
        return res;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  openSnackbar(message) {

    this.snackbar.open(message, '' ,{
      duration: 2000,
    });
  }


}
