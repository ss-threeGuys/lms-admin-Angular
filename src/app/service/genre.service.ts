import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../domain/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
 
  constructor(
    private http: HttpClient
  ) { }

  getGenres() {
    return this.http.get<any>('http://localhost:3000/admin/genres')
            .toPromise()
            .then(res => <Genre[]> res)
            .then(data => data);
  }


}
