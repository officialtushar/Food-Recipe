import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { RecipesService } from "src/app/services/recipes.service";
import { ThemePalette } from "@angular/material/core";
import { Router } from "@angular/router";
import { RecipeObservableService } from "src/app/observables/recipe-observable.service";


import { MatSnackBar } from "@angular/material";


import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogModelComponent } from "src/app/utils/dialog-model/dialog-model.component";

export interface DialogData {
  recipe: string;
}

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

  name: any;

  user: firebase.User;

  constructor(
    private recipeService: RecipesService,
    private router: Router,
    private recipeObservable: RecipeObservableService,
    private authService: AuthService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {
    this.user = JSON.parse(localStorage.getItem("token"));
    console.log("token exist", this.user);
  }

  ngOnInit() {
    this.getAllRecipes();
    this.recipeObservable.updateRecipeRoute("Recipies", false);
  }

  // dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogModelComponent, {
      width: "250px",
      data: { recipe: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");

      console.log(result);
      if(result !== undefined)
      {
        if(result === '') {
          this.recipeService.openSnackbar('Recipe Cannot be empty');
        }

        if(result !== '') {
          const payload = {
            name: result
          };

          this.recipeService.addRecipe(payload).subscribe(result => {
            console.log(result);
            if (result) {
              this.recipeService.openSnackbar('Recipe Added Successfully')
              this.getAllRecipes();
            }
          });
        }

      }

    });
  }

  getAllRecipes() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.allRecipes = recipes;
      console.log(this.allRecipes);
    });
  }

  goToRecipies(recipe) {
    console.log("Specific recipe", recipe);

    this.router.navigate(["recipes/" + recipe._id]);

    // update the observale
    this.recipeObservable.updateRecipeRoute(recipe.name, false);
  }

  removeRecipe(recipe, index) {
    this.allRecipes.splice(index, 1);

    console.log("recipe id", recipe._id);

    this.recipeService.deleteRecipe(recipe._id).subscribe(result => {
      if(result) {
        this.recipeService.openSnackbar('Recipe deleted Successfully')
      }
      console.log("result retained", result);
    });

    console.log("total recipes", this.allRecipes);
  }

  openSnackbar() {
    this.snackbar.open('You are not a Authenticate User , Please register', "", {
      duration: 2000,
      panelClass: ["blue-snackbar"]
    });

  }
}
