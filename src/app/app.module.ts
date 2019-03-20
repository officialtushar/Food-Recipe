import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Sanitizer } from "@angular/core";

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material";

import { LoginComponent } from "./Shared/login/login.component";
import { SignupComponent } from "./Shared/signup/signup.component";
import { HeaderComponent } from "./Shared/header/header.component";
import { RecipesComponent } from "./module/recipes/recipes.component";

import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    RecipesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
