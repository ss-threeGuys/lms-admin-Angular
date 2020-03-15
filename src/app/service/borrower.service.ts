import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Borrower } from '../domain/borrower';

@Injectable({
  providedIn: 'root'
})
export class BorrowerService {
  constructor(private http: HttpClient) { }

  getBorrowers() {
    return this.http
      .get<any>('http://localhost:3000/admin/borrowers')
      .toPromise()
      .then(res => <Borrower[]>res)
      .then(data => {
        return data;
      });
  }

  createBorrower(borrower) {
    return this.http
      .post<Borrower>('http://localhost:3000/admin/borrowers', borrower)
      .toPromise()
      .then(data => data);
  }

  updateBorrower(borrower) {
    return this.http
      .put(`http://localhost:3000/admin/borrowers/${borrower._id}`, borrower)
      .toPromise();
  }

  deleteBorrower(borrower) {
    return this.http
      .delete(`http://localhost:3000/admin/borrowers/${borrower._id}`)
      .toPromise();
  }
}