import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { RecipesService } from "src/app/services/recipes.service";

import { MatSnackBar } from "@angular/material";
import { RecipeObservableService } from "src/app/observables/recipe-observable.service";

@Component({
  selector: "app-view-recipe",
  templateUrl: "./view-recipe.component.html",
  styleUrls: ["./view-recipe.component.scss"]
})
export class ViewRecipeComponent implements OnInit {
  panelOpenState = false;

  editable = "true";
  editedValue: String;

  showTextField: any;

  recipeId: String;
  recipe: any;
  value = "";
  user: firebase.User;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private snackbar: MatSnackBar,
    private recipeObservable: RecipeObservableService,
    private authService: AuthService
  ) {
    this.user = JSON.parse(localStorage.getItem("token"));
    console.log("token exist", this.user);
  }

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get("id");
    console.log("recipe id", this.recipeId);

    this.recipeService.getSpecificRecipe(this.recipeId).subscribe(recipe => {
      console.log("recipe found", recipe);
      this.recipe = recipe;
      this.recipeObservable.updateRecipeRoute(this.recipe.name, true);
    },
    (error) => {
      // console.log('error in recipes component', error );
      if(error.status === 404) {
        this.recipeService.openSnackbar(error.message);
      }
    }
    );
  }

  deleteRecipe(recipe, ingredient, index) {
    console.log("recipe", recipe);
    console.log("index", index);
    this.recipe.ingredients.splice(index, 1);
    const message = `${ingredient} successfully deleted`;

    this.snackbar.open(message, "", {
      duration: 2000,
      panelClass: ["blue-snackbar"]
    });

    const payload = {
      name: recipe.name,
      ingredients: recipe.ingredients
    };

    // updated
    this.recipeService
      .updateRecipe(recipe._id, payload)
      .subscribe(updatedRecipe => {
        console.log("updated product found", updatedRecipe);
        // this.recipe = updatedRecipe;
      });

    console.log(recipe.ingredients);
  }

  editRecipe(recipe, ingredient, index) {
    const checkMatch = "editable-" + index;

    const el = document.getElementById("editable-" + index);
    el.contentEditable = "true";
    el.style.border = "1px solid #45a29e";
    // console.log(el.content);
  }

  editValue(editedValue, ingredient, i, event) {
    // console.log('editable-' + i)
    // console.log(document.getElementById('editable-' + i));
    const el = document.getElementById("editable-" + i);
    el.contentEditable = "false";
    console.log(el.innerText.trim());

    console.log("index", i);
    console.log("recipe", this.recipe);

    this.recipe.ingredients.forEach((element, index) => {
      if (index === i) {
        this.recipe.ingredients[index] = el.innerText.trim();
      }
    });

    console.log("modified", this.recipe);

    const payload = {
      name: this.recipe.name,
      ingredients: this.recipe.ingredients
    };

    this.recipeService
      .updateRecipe(this.recipe._id, payload)
      .subscribe(updatedRecipe => {
        console.log("updated product found", updatedRecipe);
        const message = `Ingredient Modified`;

        this.snackbar.open(message, "", {
          duration: 2000,
          panelClass: ["blue-snackbar"]
        });
        // this.recipe = updatedRecipe;
      });
  }

  showField() {
    this.value = '';
    this.showTextField = true;
  }

  SaveValue() {
    this.showTextField = false;
    this.recipe.ingredients.push(this.value);

    const payload = {
      name: this.recipe.name,
      ingredients: this.recipe.ingredients
    };

    this.recipeService
      .updateRecipe(this.recipe._id, payload)
      .subscribe(updatedRecipe => {
        console.log("updated product found", updatedRecipe);
        // this.recipe = updatedRecipe;
      });

    console.log(this.recipe);
  }


  openSnackbar() {
    this.snackbar.open('You are not a Authenticate User , Please register', "", {
      duration: 2000,
      panelClass: ["blue-snackbar"]
    });

  }
}
