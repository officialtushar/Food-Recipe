import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class RecipesService {
  options: any;
  constructor(private http: HttpClient) {
    const header = new Headers({ "Content-Type": "application/json" });
    this.options = header;
  }

  getRecipes() {
    // console.log('get order');

    return this.http.get("http://localhost:3000/recipes").pipe(
      map(res => {
        console.log("getting the data", res);
        return res;
      })
    );
  }
}
