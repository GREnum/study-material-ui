
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { SettingService } from "./setting.service";

@Injectable()
export class SettingResolverService implements Resolve<any> {

    constructor(
        private _settingService: SettingService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this._settingService.getSetting();
    }

}