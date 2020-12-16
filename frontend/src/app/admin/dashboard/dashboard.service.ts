import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";


@Injectable()
export class DashboardService {
    constructor(
        private _httpClient: HttpClient
    ) { }

    public getAllCount