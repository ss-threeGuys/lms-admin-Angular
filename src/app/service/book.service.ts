import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../domain/book';
import { environment } from  "../../environments/environment"
const {baseHost, basePort, prefix, book : bookURL} = environment.crudUrls;
const BASEURL = `http://${baseHost}:${basePort}${prefix}${bookURL}/`

@Injectable(
  { providedIn: 'root' }
)
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

  getBooks() {
    return this.http.get<any>(BASEURL)
  }

  createBook(book) {
    return this.http.post<Book>(BASEURL, book)
      

  }

  updateBook(book) {
    return this.http.put(BASEURL + book._id, book)


  }

  deleteBook(book) {
    return this.http.delete(BASEURL + book._id)
     
  }
}