import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipesService } from 'src/app/services/recipes.service';


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
    private recipeService: RecipesService
  ) { }

  ngOnInit() {

    this.recipeId = this.route.snapshot.paramMap.get('id');
    console.log('recipe id',this.recipeId)

    this.recipeService.getSpecificRecipe(this.recipeId).subscribe((recipe) => {
      console.log('recipe found', recipe);
      this.recipe  = recipe;
    })



  }

}
