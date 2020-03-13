import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthorComponent } from "./author/author.component";
import { BranchTableComponent } from "./components/branch-table/branch-table.component";
const routes: Routes = [
  { path: "admin/author", component: AuthorComponent },
  { path: "admin/branches", component: BranchTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
