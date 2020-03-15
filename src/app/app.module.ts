import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthorComponent } from "./author/author.component";
import { AuthorService } from "./author.service";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BranchTableComponent } from "./components/branch-table/branch-table.component";
import { BranchService } from "./service/branch.service";
import { GenreComponent } from './components/genre/genre.component';
import { GenreService } from './service/genre.service';
import { BorrowerComponent } from './components/borrower/borrower.component';
import { BorrowerService } from './service/borrower.service';
import { AdminMenuComponent } from "./components/admin-menu/admin-menu.component";
import { MenuModule } from "primeng/menu";
import { TabMenuModule } from "primeng/tabmenu";




@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    BranchTableComponent,
    GenreComponent,
    BorrowerComponent,
    AdminMenuComponent
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    MenuModule,
    TabMenuModule
  ],
  providers: [AuthorService, BranchService, GenreService, BorrowerService],
  bootstrap: [AppComponent]
})
export class AppModule {}
