import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { LoginComponent } from "./login.component";
import { LoginRoutingModule } from "./login-routing.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        LoginRoutingModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}
