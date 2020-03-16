import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../domain/book';

@Injectable(
  { providedIn: 'root' }
)
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

  getBooks() {
    return this.http.get<any>('http://localhost:3000/admin/books')
      .toPromise()
      .then(res => <Book[]>res)
      .then(data => data);
  }

  createBook(book) {
    return this.http.post<Book>('http://localhost:3000/admin/books', book)
      .toPromise()
      .then(data => data);

  }

  updateBook(book) {
    return this.http.put(`http://localhost:3000/admin/books/${book._id}`, book)
      .toPromise()


  }

  deleteBook(book) {
    return this.http.delete(`http://localhost:3000/admin/books/${book._id}`)
      .toPromise()
  }
}