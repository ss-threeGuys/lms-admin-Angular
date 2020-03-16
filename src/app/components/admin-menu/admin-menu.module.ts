import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminMenuComponent } from "./admin-menu.component";

import { TabMenuModule } from "primeng/tabmenu";
import { TabViewModule } from "primeng/tabview";
import { MessageModule } from "primeng/message";

@NgModule({
  declarations: [AdminMenuComponent],
  imports: [CommonModule, TabMenuModule, TabViewModule, MessageModule]
})
export class AdminMenuModule {}
