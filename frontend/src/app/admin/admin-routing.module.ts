
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminGuard } from "../_auth/admin.guard";
import { AdminComponent } from "./admin.component";
import { AdminResolverService } from "./admin-resolve.service";


const routes: Routes = [
    {
        path: "", component: AdminComponent,
        resolve: { currentUser: AdminResolverService },
        children: [
            { path: "products", loadChildren: "./products/products.module#ProductsModule" },
            { path: "cart", loadChildren: "./cart/cart.module#CartModule" },
            { path: "dashboard", loadChildren: "./dashboard/dashboard.module#DashboardModule" },
            { path: "orders", loadChildren: "./orders/orders.module#OrdersModule" },
            { path: "user", loadChildren: "./user/user.module#UserModule" },
            {
                path: "setting",
                loadChildren: "./setting/setting.module#SettingModule",
                canActivate: [AdminGuard]
            },
            // { path: "tables", loadChildren: "./tables/tables.module#TablesModule" },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }