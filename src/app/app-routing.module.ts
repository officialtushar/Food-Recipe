import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Shared/login/login.component';
import { SignupComponent } from './Shared/signup/signup.component';
import { RecipesComponent } from './module/recipes/recipes.component';


const routes: Routes = [
  {path: '', pathMatch: 'full',redirectTo: 'recipes'},
  {path: 'login', pathMatch: 'full', component: LoginComponent},
  {path: 'signup', pathMatch: 'full', component: SignupComponent},
  {path: 'recipes', pathMatch: 'full', component: RecipesComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
