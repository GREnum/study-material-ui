import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { ISetting } from "../setting/setting.interface";
import { SettingService } from "../setting/setting.service";


@Injectable()
export class ProductTextResolverService implements Resolve<ISetting> {

    constructor(
        private _settingService: SettingService
    ) { }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISetting> {
        let setting: Observable<ISetting> = this._settingService.getOnly("productText");

        return setting;
    }

}
