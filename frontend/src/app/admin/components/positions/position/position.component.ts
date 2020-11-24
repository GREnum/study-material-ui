import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "position-comp",
    templateUrl: "./position.component.html",
    styleUrls: ["./position.component.scss"]
})
export class PositionComponent {
    @Input() public pos