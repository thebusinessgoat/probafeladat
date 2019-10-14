import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { SignInComponent } from './page/login/sign-in/sign-in.component';
import { AddUserComponent } from './page/user/add-user/add-user.component';
import { EditUserComponent } from './page/user/edit-user/edit-user.component';
import { ListUserComponent } from './page/user/list-user/list-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './util/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule
  ],
  providers: [AuthGuard], //ide kell az AuthGuard
  bootstrap: [AppComponent]
})
export class AppModule { }
