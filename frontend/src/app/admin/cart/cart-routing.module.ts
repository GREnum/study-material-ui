import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CartComponent } from "./cart.component";
import { CartResolverService } from "./cart-resolver.service";
import { AllUsersResolverService } from "../user/all-users-resolve.service";
import { CartTextResolverService } from "./cart-resolver-text.service";



const routes: Route