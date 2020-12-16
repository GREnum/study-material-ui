
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { DashboardService } from "./dashboard.service";
import { DashboardComponent } from "./dashboard.component";
import { DashboardRoutingModule } from "./dashboard-routing.module";


@NgModule({
    imports: [
        CommonModule,
        // NgbCarouselModule.forRoot(),
        // NgbAlertModule.forRoot(),
        DashboardRoutingModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [DashboardService],
})
export class DashboardModule { }