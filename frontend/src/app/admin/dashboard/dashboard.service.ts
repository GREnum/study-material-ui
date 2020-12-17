import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


@Injectable()
export class DashboardService {
    constructor(
        private _httpClient: HttpClient
    ) { }

    public getAllCounter() {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        const options = { headers: headers };
        return this._httpClient.get("/api/counterparty/", options);
    }

}
