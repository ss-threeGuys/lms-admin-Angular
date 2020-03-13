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

@NgModule({
  declarations: [AppComponent, AuthorComponent, BranchTableComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    InputTextModule,
    DialogModule,
    ButtonModule
  ],
  providers: [AuthorService, BranchService],
  bootstrap: [AppComponent]
})
export class AppModule {}
