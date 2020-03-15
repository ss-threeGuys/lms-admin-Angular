import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorComponent } from "./author/author.component";
import { BranchTableComponent } from "./components/branch-table/branch-table.component";
import { GenreComponent } from './components/genre/genre.component';
import { BorrowerComponent } from './components/borrower/borrower.component';

const routes: Routes = [
  { path: "admin/authors", component: AuthorComponent },
  { path: "admin/branches", component: BranchTableComponent },
  { path: "admin/genres", component: GenreComponent },
  { path: "admin/borrowers", component: BorrowerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
