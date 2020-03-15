import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorComponent } from './components/author/author.component';
import {BookComponent} from './components/book/book.component';

const routes: Routes = [
  {path : 'admin/authors', component: AuthorComponent},
  {path : 'admin/books', component: BookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
