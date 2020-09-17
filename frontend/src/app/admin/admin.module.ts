
import { AuthService } from "../_auth/auth.service";
import { PositionComponent } from "./components/positions/position/position.component";
import { PositionsComponent } from "./components/positions/positions.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";

import { AdminComponent } from "./admin.component";
import { HeaderComponent } from "./components/header/header.component";
import { PositionsService } from "./components/positions/position.service";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminResolverService } from "./admin-resolve.service";
import { SettingService } from "./setting/setting.service";
import { AdminGuard } from "../_auth/admin.guard";


@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        AdminRoutingModule
    ],
    declarations: [
        AdminComponent,
        HeaderComponent,
        SidebarComponent
    ],
    providers: [
        PositionsService,
        AuthService,
        AdminResolverService,
        SettingService,
        AdminGuard
    ]
})
export class AdminModule { }