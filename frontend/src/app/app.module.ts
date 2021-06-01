import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { ToasterModule } from "angular2-toaster";


import { AuthGuard } from "./_auth/auth.guard";
import { AuthService } from "./_auth/auth.service";
import { AppComponent } from "./app.component";
import { ToasterComponent } from "./_toaster/toaster.component";
import { AppRoutergModule } from "./app-routing.module";
import { HttpInterceptorService } from "./_auth/http-interceptor.service";


@NgModule({
  imports: [
    BrowserModule,
    HttpClie