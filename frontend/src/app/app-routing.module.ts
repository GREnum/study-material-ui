import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./_auth/auth.guard";


const routes: Routes = [
    { path: "", redirectTo: "admin", pathMatch: "full" },
    { path: "admin", loadChildren: "./admi