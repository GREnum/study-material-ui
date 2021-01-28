import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProductsComponent } from "./products.component";
import { ProductTextResolverService } from "./products-resolver-text.service";


const routes: Routes = [
    {
        path: "",
        component: ProductsComponent,
  