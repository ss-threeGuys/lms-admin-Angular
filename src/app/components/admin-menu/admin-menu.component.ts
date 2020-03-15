import { Component, OnInit } from "@angular/core";

import { TabMenuModule } from "primeng/tabmenu";
import { MenuItem } from "primeng/api";
@Component({
  selector: "app-admin-menu",
  templateUrl: "./admin-menu.component.html",
  styleUrls: ["./admin-menu.component.css"]
})
export class AdminMenuComponent implements OnInit {
  items: MenuItem[];
  activeItem: MenuItem;

  ngOnInit() {
    this.items = [
      { label: "Home", icon: "pi pi-fw pi-home" },
      { label: "Calendar", icon: "pi pi-fw pi-calendar" },
      { label: "Edit", icon: "pi pi-fw pi-pencil" },
      { label: "Documentation", icon: "pi pi-fw pi-file" },
      { label: "Settings", icon: "pi pi-fw pi-cog" }
    ];
  }
}
