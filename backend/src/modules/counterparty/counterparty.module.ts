
import { Module } from "@nestjs/common";

import { CounterpartyService } from "./counterparty.service";
import { CounterpartyController } from "./counterparty.controller";


@Module({
    controllers: [CounterpartyController],
    components: [CounterpartyService]
})
export class CounterpartyModule { }