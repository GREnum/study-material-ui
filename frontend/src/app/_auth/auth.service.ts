
import { Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { IUser } from "./user.interface";


@Injectable()
export class AuthService {

    public currentUser: {
        user: {
            name: string;
            isAdmin: boolean;
        },
        token: string
    };

    constructor(private _httpClient: HttpClient) {
        let currentUser = JSON.parse(localStorage.getItem("currentUser"));
        this.currentUser = currentUser;
    }

    public changePassword(regUser: any): Observable<any> {
        const body = JSON.stringify(regUser);
        return this._httpClient.post("/api/user/changepassword", body);
    }

    public getAllUsers(): Observable<any> {
        return this._httpClient.get("/api/user");
    }

    public reloadStorage() {
        return this._httpClient.get("/api/user/reload");
    }

    public setStorageCurrentUser(currentUser: any): void {
        this.currentUser = currentUser;
        localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    }

    public getStorageCurrentUser() {
        this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
        return this.currentUser || null;
    }

    public register(username: string, password: string, currencyId: string): Observable<any> {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        const options = { headers: headers };
        const body = JSON.stringify({ name: username, password: password, currencyId: currencyId });
        return this._httpClient.post("/api/user/register", body, options);
    }

    public login(username: string, password: string): Observable<any> {
        const headers = new HttpHeaders({ "Content-Type": "application/json" });
        const options = { headers: headers };
        const body = JSON.stringify({ name: username, password: password });

        return this._httpClient.post("/api/user/authenticate", body, options);
    }

    public logout(): void {
        this.currentUser = null;
        localStorage.removeItem("currentUser");
    }

    public isLoggedIn(): boolean {
        return !!JSON.parse(localStorage.getItem("currentUser"));
    }

    public isAdmin(): boolean {
        return this.currentUser.user.isAdmin;
    }
}