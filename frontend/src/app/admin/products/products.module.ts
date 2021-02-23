import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { ProductsService } from "./products.service";
import { PositionsModule } from "../components/positions/positions.module";
import { ProductsComponent } from "./products.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { ProductTextResolverService } from "./products-resolver-text.service";


@NgModule({
    imports: [
        CommonModule,
       