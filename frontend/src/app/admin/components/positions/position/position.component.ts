import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "position-comp",
    templateUrl: "./position.component.html",
    styleUrls: ["./position.component.scss"]
})
export class PositionComponent {
    @Input() public position: any;
    @Input() public changed: boolean;
    @Output() public onChangePositionQuantity = new EventEmitter<string>();

    public changeQuantity(increased: boolean) {
        if (!this.changed) {
            return true;
        }
        let oldQuantity = this.position.