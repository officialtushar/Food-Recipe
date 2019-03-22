import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { MatSnackBar } from "@angular/material";
import {environment} from '../../environments/environment.dev';

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  options: any;
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar) {
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
      })
    );
  }

  getSpecificRecipe(recipeId) {
    // console.log('get order');

    return this.http.get(environment.dev_url +  'recipes/' + recipeId).pipe(
      map(res => {
        console.log("getting the data", res);
        return res;
      })
    );
  }

  updateRecipe(recipeId,payload) {

    console.log(recipeId);
    console.log('payload',payload);

    return this.http.put(environment.dev_url +  'recipes/' + recipeId, payload).pipe(
      map(res => {
        return res;
      })
    );
  }

  deleteRecipe(recipeId) {
    console.log(recipeId);
    // console.log('payload',payload);
    return this.http.delete(environment.dev_url +  'recipes/' + recipeId).pipe(
      map(res => {
        return res;
      })
    );
  }

  addRecipe(payload) {
    return this.http.post(environment.dev_url +  'recipes', payload).pipe(
      map(res => {
        return res;
      })
    );
  }

  openSnackbar(message) {

    this.snackbar.open(message, '' ,{
      duration: 2000,
    });
  }


}
