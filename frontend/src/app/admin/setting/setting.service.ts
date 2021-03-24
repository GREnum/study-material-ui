
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable()
export class SettingService {
    constructor(
        private _httpClient: HttpClient
    ) { }

    public getSetting(): Observable<any> {
        return this._httpClient.get("/api/setting/");
    }

    public setSetting(body: any): Observable<any> {
        return this._httpClient.post("/api/setting/", JSON.stringify(body));
    }

    public getOnly(setting: string): Observable<any> {
        return this._httpClient.get("/api/setting/get?setting=" + setting);
    }

}