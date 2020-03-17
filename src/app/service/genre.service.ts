import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genre } from '../domain/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  constructor(private http: HttpClient) { }

  getGenres() {
    return this.http
      .get<any>('http://localhost:3000/admin/genres')
  }

  createGenre(genre) {
    return this.http
      .post<Genre>('http://localhost:3000/admin/genres', genre)
   
  }

  updateGenre(genre) {
    return this.http
      .put(`http://localhost:3000/admin/genres/${genre._id}`, genre)
   
  }

  deleteGenre(genre) {
    return this.http
      .delete(`http://localhost:3000/admin/genres/${genre._id}`)
  
  }
}
