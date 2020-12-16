import { Component, OnInit } from "@angular/core";

import { DashboardService } from "./dashboard.service";


@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html"
})
export class DashboardComponent implements OnInit {
    public counterparties: any;
    constructor(
        private _dashboardService: DashboardService
    ) { }

    public ngOnInit() {
        this._dashboardService.getAllCounter().subscribe(
            result => {
                this.counterparties = result;
            }
        );
    }
}
