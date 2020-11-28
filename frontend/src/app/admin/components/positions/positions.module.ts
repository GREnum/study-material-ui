import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { PositionComponent } from "./position/position.component";
import { PositionsComponent } from "./positions.component";


@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        PositionsComponent,
        PositionComponent
    ],
    exports: [
        PositionsComponent,
        PositionComponent
    ]
})
export class PositionsModule { }
