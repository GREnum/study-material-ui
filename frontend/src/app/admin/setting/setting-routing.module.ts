import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingComponent } from "./setting.component";
import { SettingResolverService } from "./setting-resolve.service";


const routes: Routes = [
    { path: "", component: SettingComponent, resolve: { setting: SettingResolverService } }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingRoutingModule { }
