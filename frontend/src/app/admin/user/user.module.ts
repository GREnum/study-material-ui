
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { AdminGuard } from "../../_auth/admin.guard";
import { UserComponent } from "./user.component";
import { UserRoutingModule } from "./user-routing.module";
import { ChangePasswordComponent } from "./change-password/change-password.component";
import { AllUsersResolverService } from "./all-users-resolve.service";
import { UserService } from "./user.service";
import { CurrencyResolverService } from "./currency-resolve.service";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        UserRoutingModule
    ],
    declarations: [
        UserComponent, 
        ChangePasswordComponent
    ],
    providers: [
        AdminGuard,
        UserService,
        CurrencyResolverService,
        AllUsersResolverService
    ]
})
export class UserModule {
}