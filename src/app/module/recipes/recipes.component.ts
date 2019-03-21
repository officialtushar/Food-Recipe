import { Component, OnInit } from "@angular/core";
import { RecipesService } from "src/app/services/recipes.service";
import { ThemePalette } from "@angular/material/core";
import { Router } from "@angular/router";

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

  constructor(
    private recipeService: RecipesService,
    private router: Router
    ) {}

  ngOnInit() {
    this.getAllRecipes();
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
  }
}
