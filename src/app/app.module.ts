import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthorComponent } from "./components/author/author.component";
import { AuthorService } from "./service/author.service";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { DialogModule } from "primeng/dialog";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BranchTableComponent } from "./components/branch-table/branch-table.component";
import { BranchService } from "./service/branch.service";
import { GenreComponent } from "./components/genre/genre.component";
import { GenreService } from "./service/genre.service";
import { AdminMenuComponent } from "./components/admin-menu/admin-menu.component";
import { MenuModule } from "primeng/menu";
import { TabMenuModule } from "primeng/tabmenu";
import { BookComponent } from "./components/book/book.component";
import { MultiSelectModule } from "primeng/multiselect";
import { BorrowerComponent } from "./components/borrower/borrower.component";
import { BorrowerService } from "./service/borrower.service";
import { PublisherComponent } from "./publisher/component/publisher.component";
import { PublisherService } from './publisher/service/publisher.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthorComponent,
    BookComponent,
    BranchTableComponent,
    BorrowerComponent,
    GenreComponent,
    AdminMenuComponent,
    PublisherComponent
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
    MultiSelectModule,
    MenuModule,
    TabMenuModule
  ],
  providers: [
    AuthorService,
    BranchService,
    GenreService,
    PublisherService,
    BorrowerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
