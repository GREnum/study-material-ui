
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: "positions-comp",
    templateUrl: "./positions.component.html",
    styleUrls: ["./positions.component.scss"]
})
export class PositionsComponent {
    @Input() public positions: any;
    @Input() public productId: string;
    @Input() public changed: boolean = true;
    @Output() public onChangePosition = new EventEmitter<{ productId: string; positionId: string; }>();

    public onChangePositionQuantity(positionId: string) {
        this.onChangePosition.emit({ productId: this.productId, positionId: positionId });
    }
}
