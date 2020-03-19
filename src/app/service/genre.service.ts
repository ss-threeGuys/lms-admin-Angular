import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Genre } from '../domain/genre';
import { environment } from 'src/environments/environment';

const crudUrls = {
  create: 'http://' + environment.crudUrls.baseHost + ':'
    + environment.crudUrls.basePort
    + environment.crudUrls.prefix
    + environment.crudUrls.genre.create.url,
  retrieve: 'http://' + environment.crudUrls.baseHost + ':'
    + environment.crudUrls.basePort
    + environment.crudUrls.prefix
    + environment.crudUrls.genre.retrieve.url,
  update: 'http://' + environment.crudUrls.baseHost + ':'
    + environment.crudUrls.basePort
    + environment.crudUrls.prefix
    + environment.crudUrls.genre.update.url,
  delete: 'http://' + environment.crudUrls.baseHost + ':'
    + environment.crudUrls.basePort
    + environment.crudUrls.prefix
    + environment.crudUrls.genre.delete.url,
};


const params = {
  create: environment.crudUrls.genre.create.param,
  retrieve: environment.crudUrls.genre.retrieve.param,
  update: environment.crudUrls.genre.update.param,
  delete: environment.crudUrls.genre.delete.param,
}

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  constructor(private http: HttpClient) { }

  getGenres(currentPage: number, pageSize: number, sortField: string, sortOrder: number) {
    sortField = sortField.trim();
    const options = {
      params: new HttpParams()
        .set('sortField', sortField)
        .set('sortOrder', sortOrder.toString())
        .set('currentPage', currentPage.toString())
        .set('pageSize', pageSize.toString())
    };
    return this.http
      .get<any[]>(crudUrls.retrieve + '/paging', options)
  }

  getAllGenres() {
    return this.http
      .get<Genre[]>(crudUrls.retrieve)
  }

  createGenre(genre) {
    return this.http
      .post<Genre>(crudUrls.create, genre)
  }

  updateGenre(genre) {
    let url = crudUrls.update;

    for (let param of Object.keys(params.update)) {
      url = url.replace(':' + param, genre[params.update[param]]);
    }
    return this.http
      .put(url, genre)
  }

  deleteGenre(genre) {
    let url = crudUrls.delete;

    for (let param of Object.keys(params.delete)) {
      url = url.replace(':' + param, genre[params.delete[param]]);
    }
    return this.http
      .delete(url)
  }
}
