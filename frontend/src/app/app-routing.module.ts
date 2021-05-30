import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./_auth/auth.guard";


const routes: Routes = [
    { path: "", redirectTo: "admin", pathMatch: "full" },
    { path: "admin", loadChildren: "./admin/admin.module#AdminModule", canActivate: [AuthGuard] },
    { path: "login", loadChildren: "./pages/user/login/login.module#LoginModule" },
    { path: "not-found", loadChildren: "./_not-found/not-found.module#NotFoundModule" },
    { path: "**", redirectTo: "not-found" }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutergModule { }
