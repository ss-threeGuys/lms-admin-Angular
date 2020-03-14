import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorComponent } from './author/author.component';
import { PublisherComponent } from './publisher/component/publisher.component';


const routes: Routes = [
    {path : 'admin/author', component: AuthorComponent},
    {path : 'admin/publisher', component: PublisherComponent},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
