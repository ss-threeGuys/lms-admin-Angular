import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Author } from '../domain/author'

@Injectable(
  {providedIn: 'root'}
)
export class AuthorService {
 
  constructor(
    private http: HttpClient
  ) { }

  getAuthors() {
    return this.http.get<any>('http://localhost:3000/admin/authors')
            .toPromise()
            .then(res => <Author[]> res)
            .then(data => data);
  }

  createAuthor(author) {
    return this.http.post<Author>('http://localhost:3000/admin/authors', author )
    .toPromise()
    .then(data => data);
    
  }

  updateAuthor(author) {
    return this.http.put(`http://localhost:3000/admin/authors/${author._id}`, author)
    .toPromise()
  }

  deleteAuthor(author) {
    return this.http.delete(`http://localhost:3000/admin/authors/${author._id}`)
    .toPromise()
  }
}
