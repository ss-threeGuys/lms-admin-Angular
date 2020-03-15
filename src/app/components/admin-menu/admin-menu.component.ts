import { Component, OnInit } from "@angular/core";

import { MenuItem } from "primeng/api";
@Component({
  selector: "app-admin-menu",
  templateUrl: "./admin-menu.component.html",
  styleUrls: ["./admin-menu.component.css"]
})
export class AdminMenuComponent implements OnInit {
  items: MenuItem[];

  ngOnInit() {
    const baseRoute: string = "admin/";
    this.items = [
      { label: "Author", routerLink: [`${baseRoute}authors`] },
      { label: "Book", routerLink: [`${baseRoute}books`] },
      { label: "Genre", routerLink: [`${baseRoute}genres`] },
      { label: "Publisher", routerLink: [`${baseRoute}publishers`] },
      { label: "Branch", routerLink: [`${baseRoute}branches`] },
      { label: "Borrower", routerLink: [`${baseRoute}borrowers`] }
    ];
  }
}
