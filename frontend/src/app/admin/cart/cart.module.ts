import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CartComponent } from "./cart.component";
import { OrdersService } from "../orders/orders.service";
import { PositionsModule } from "../components/positions/positions.module";
import { CartRoutingModule } from "./cart-routing.module";
import { CartResolverService } from "./cart-resolver.service";
import { AllUsersResolverService } from "../user/all-users-resolve.service";
import { CartTextResolverService } from "./cart-resolver-text.service";


@NgModule({
    imports: [
        CommonModule,
        CartRoutingModule,
 