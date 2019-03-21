import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RecipeObservableService {

  private recipeRoute = new BehaviorSubject({});
  recipeRouteObservable = this.recipeRoute.asObservable();

  constructor() { }


  updateRecipeRoute(updatedRoute,presentToken) {
    const route =  {
      name: updatedRoute,
      present: presentToken
    }
    this.recipeRoute.next(route);
  }
}
