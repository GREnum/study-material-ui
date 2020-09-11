
import { Component } from "@angular/core";
import { ToasterService, ToasterConfig } from "angular2-toaster";



@Component({
    selector: "app-toaster",
    template: `<toaster-container [toasterconfig]="toasterconfig"></toaster-container>`
})
export class ToasterComponent {
    public toasterconfig: ToasterConfig =

    new ToasterConfig({
        animation: "fade",
        showCloseButton: true,
        tapToDismiss: false,
        timeout: 3000,
        newestOnTop: false,
        mouseoverTimerStop: true
    });

    constructor(private _toasterServise: ToasterService) {
    }

}
