import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeObservableService } from 'src/app/observables/recipe-observable.service';






@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  updatedRoute :any;

  constructor(
    private router :Router,
    private recipeObservable: RecipeObservableService

  ) { }

  ngOnInit() {
    this.recipeObservable.recipeRouteObservable.subscribe((updateRoute) => {
      console.log('update route', updateRoute)
      this.updatedRoute = updateRoute;
    })
  }


  goToRecipes() {
    this.router.navigate(['recipes']);
  }

}
