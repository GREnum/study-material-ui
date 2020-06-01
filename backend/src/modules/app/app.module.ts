import { Module } from "@nestjs/common";

// import { AuthModule } from "../auth/auth.module";
// import { RoleModule } from "../roles/role.module";
import { UserModule } from "../user/user.module";
import { OrderModule } from "../order/order.module";
import { ProductModule } from "../product/product.module";
import { SettingModule } from "../setting/setting.module";
import { CommonModule } from "../../common/common.module";
import { CounterpartyModule } from "../counterparty/counterparty.module";
// import { AuthServ