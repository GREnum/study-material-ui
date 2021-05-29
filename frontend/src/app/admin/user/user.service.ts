import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";


@Injectable()
export class UserService {
    constructor(
        private _httpClient: HttpClient
    ) { }

    public getAllCurrency(): Observable<any> {
        return this._httpClient.get("/api/user/currency");
    }

}
