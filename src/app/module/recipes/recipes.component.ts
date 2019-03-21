import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from "@angular/core";
import { RecipesService } from "src/app/services/recipes.service";
import { ThemePalette } from "@angular/material/core";
import { Router } from "@angular/router";
import { RecipeObservableService } from "src/app/observables/recipe-observable.service";



export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.scss"]
})
export class RecipesComponent implements OnInit {
  availableColors: ChipColor[] = [{ name: "VIEW", color: undefined }];

  allRecipes: any;

  user: firebase.User;

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private recipeObservable: RecipeObservableService,
    private authService: AuthService

    ) {

    }

  ngOnInit() {

    this.getAllRecipes();
    this.recipeObservable.updateRecipeRoute('Recipies', false);

  }

  getAllRecipes() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.allRecipes = recipes;
      console.log(this.allRecipes);
    });
  }

  goToRecipies(recipe) {
    console.log("Specific recipe", recipe);

    this.router.navigate(['recipes/' + recipe._id])



    // update the observale
    this.recipeObservable.updateRecipeRoute(recipe.name, false);
  }

  removeRecipe(recipe,index) {
    this.allRecipes.splice(index, 1);

    console.log('recipe id',recipe._id);

    this.recipeService.deleteRecipe(recipe._id).subscribe((result) => {
        console.log('result retained', result);
    })

    console.log('total recipes',this.allRecipes);


  }

  addRecipe() {

  }

}
