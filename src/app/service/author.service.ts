import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Author } from "../domain/author";
import { environment } from  "../../environments/environment"
const {baseHost, basePort, prefix, author : authorURL} = environment.crudUrls;
const BASEURL = `http://${baseHost}:${basePort}${prefix}${authorURL}/`



@Injectable({ providedIn: "root" })
export class AuthorService {
  constructor(private http: HttpClient) {}

  getAuthors() {
    return this.http
      .get<any>(BASEURL)
      
  }

  getAuthorsPaging(sortField, sortOrder, curPage, pageSize) {
    return this.http.get<any>(
      `${BASEURL}paging?sortField=${sortField}&sortOrder=${sortOrder}&currentPage=${curPage}&pageSize=${pageSize}`)
  }

  createAuthor(author) {
    return this.http
      .post<Author>(BASEURL, author)
     
  }

  updateAuthor(author) {
    return this.http
      .put(BASEURL + author._id, author)

  }

  deleteAuthor(author) {
    return this.http
      .delete(BASEURL + author._id)
 
  }
}
