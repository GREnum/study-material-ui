
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { OrdersService } from "./orders.service";
import { PositionsModule } from "../components/positions/positions.module";
import { OrdersComponent } from "./orders.component";
import { OrdersRoutingModule } from "./orders-routing.module";
import { OrderDetailComponent } from "./detail/order-detail.component";
import { OrderResolverService } from "./order-resolver.service";
import { OrderDetailResolverService } from "./detail/order-detail-resolver.service";


@NgModule({
    imports: [
        CommonModule,
        PositionsModule,
        // NgbCarouselModule.forRoot(),
        // NgbAlertModule.forRoot(),
        OrdersRoutingModule
    ],
    declarations: [
        OrdersComponent,
        OrderDetailComponent
    ],
    providers: [
        OrdersService,
        OrderResolverService,
        OrderDetailResolverService
    ]
})
export class OrdersModule { }