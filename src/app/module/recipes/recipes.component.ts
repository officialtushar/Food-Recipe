import { Component, OnInit } from "@angular/core";
import { RecipesService } from "src/app/services/recipes.service";
import {ThemePalette} from '@angular/material/core';

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

  availableColors: ChipColor[] = [
    {name: 'VIEW', color: undefined}
  ];

  allRecipes: any;

  constructor(private recipeService: RecipesService) {}

  ngOnInit() {
    this.getAllRecipes();
  }

  getAllRecipes() {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.allRecipes = recipes;
      console.log(this.allRecipes);

    });

  }
}
