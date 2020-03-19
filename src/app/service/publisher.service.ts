import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publisher } from '../domain/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
 
  constructor(
    private http: HttpClient
  ) { }

  getPublishers() {
    return this.http.get<any>('http://localhost:3000/admin/publishers')
  }


}

