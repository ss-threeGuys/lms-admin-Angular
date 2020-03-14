import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorComponent } from './author/author.component';

const routes: Routes = [{path : 'admin/author', component: AuthorComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
