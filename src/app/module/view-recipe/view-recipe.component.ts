import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';


import {MatSnackBar} from '@angular/material';
import { RecipeObservableService } from 'src/app/observables/recipe-observable.service';



@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.scss']
})
export class ViewRecipeComponent implements OnInit {
  panelOpenState = false;

  recipeId: String;
  recipe :any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private snackbar: MatSnackBar,
    private recipeObservable: RecipeObservableService

  ) { }

  ngOnInit() {




    this.recipeId = this.route.snapshot.paramMap.get('id');
    console.log('recipe id',this.recipeId)

    this.recipeService.getSpecificRecipe(this.recipeId).subscribe((recipe) => {
      console.log('recipe found', recipe);
      this.recipe  = recipe;
      this.recipeObservable.updateRecipeRoute(this.recipe.name)
    })



  }

  deleteRecipe(recipe ,ingredient, index) {
    console.log('recipe', recipe);
    console.log('index', index);
    this.recipe.ingredients.splice(index,1);
    const message = `${ingredient} successfully deleted`;

    this.snackbar.open(message, '', {
      duration: 2000,
      panelClass: ['blue-snackbar']
    });

    const payload = {
      name: recipe.name,
      ingredients: recipe.ingredients
    }


    // updated
    this.recipeService.updateRecipe(recipe._id,payload).subscribe((updatedRecipe) => {
      console.log('updated product found',updatedRecipe);
      // this.recipe = updatedRecipe;
    })

    console.log(recipe.ingredients);
  }

}
