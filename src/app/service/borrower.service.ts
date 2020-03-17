import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Borrower } from '../domain/borrower';
import { environment } from 'src/environments/environment';

const crudUrls = {
  create: 'http://' + environment.crudUrls.baseHost + ':'
    + environment.crudUrls.basePort
    + environment.crudUrls.prefix
    + environment.crudUrls.borrower.create.url,
  retrieve: 'http://' + environment.crudUrls.baseHost + ':'
    + environment.crudUrls.basePort
    + environment.crudUrls.prefix
    + environment.crudUrls.borrower.retrieve.url,
  update: 'http://' + environment.crudUrls.baseHost + ':'
    + environment.crudUrls.basePort
    + environment.crudUrls.prefix
    + environment.crudUrls.borrower.update.url,
  delete: 'http://' + environment.crudUrls.baseHost + ':'
    + environment.crudUrls.basePort
    + environment.crudUrls.prefix
    + environment.crudUrls.borrower.delete.url,
};


const params = {
  create: environment.crudUrls.borrower.create.param,
  retrieve: environment.crudUrls.borrower.retrieve.param,
  update: environment.crudUrls.borrower.update.param,
  delete: environment.crudUrls.borrower.delete.param,
}

@Injectable({
  providedIn: 'root'
})
export class BorrowerService {
  constructor(private http: HttpClient) { }

  getBorrowers() {
    return this.http
      .get<Borrower[]>(crudUrls.retrieve)
  }

  createBorrower(borrower) {
    return this.http
      .post<Borrower>(crudUrls.create, borrower)
  }

  updateBorrower(borrower) {
    let url = crudUrls.update;

    for (let param of Object.keys(params.update)) {
      url = url.replace(':' + param, borrower[params.update[param]]);
    }
    return this.http
      .put(url, borrower)
  }

  deleteBorrower(borrower) {
    let url = crudUrls.delete;

    for (let param of Object.keys(params.delete)) {
      url = url.replace(':' + param, borrower[params.delete[param]]);
    }
    return this.http
      .delete(url)
  }
}