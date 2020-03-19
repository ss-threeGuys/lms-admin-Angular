import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/domain/genre';
import { GenreService } from 'src/app/service/genre.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  displayDialog: boolean;
  genre: Genre = {};
  selectedGenre: Genre;
  newGenre: boolean;
  genres: Genre[];
  cols: any[];
  totalRecords: number;
  rowsNumber: number;
  currentPage: number;

  constructor(private genreService: GenreService) {
    this.currentPage = 1;
    this.rowsNumber = 4;
  }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: "Name" }
    ];
  }

  loadGenresLazy(event: LazyLoadEvent) {
    this.currentPage = 1 + (event.first / this.rowsNumber);
    this.genreService.getGenres(this.currentPage, this.rowsNumber, event.sortField, event.sortOrder).subscribe(res => {
      this.totalRecords = res[res.length - 1].__paging.count;
      res.pop();
      return (this.genres = [...res]);
    });
  }

  showDialogToAdd() {
    this.newGenre = true;
    this.genre = {};
    this.displayDialog = true;
  }

  save() {
    let genres = [...this.genres];

    if (this.newGenre) {
      this.genreService.createGenre(this.genre).subscribe(() => {
        genres.push(this.genre);
        this.genres = genres;
        this.genre = null;
        this.displayDialog = false;
      });
    }
    else {
      this.genreService.updateGenre(this.genre).subscribe(() => {
        genres[this.genres.indexOf(this.selectedGenre)] = this.genre;
        this.genres = genres;
        this.genre = null;
        this.displayDialog = false;
      });
    }
  }

  delete() {
    this.genreService.deleteGenre(this.genre).subscribe(() => {
      console.log(this.genres);
      let index = this.genres.indexOf(this.selectedGenre);
      this.genres = this.genres.filter((_, i) => i != index);
      this.genre = null;
      this.displayDialog = false;
    });
  }

  onRowSelect(event) {
    this.newGenre = false;
    this.genre = this.cloneGenre(event.data);
    this.displayDialog = true;
  }

  cloneGenre(g: Genre): Genre {
    let genre = {};
    for (let prop in g) {
      genre[prop] = g[prop];
    }
    return genre;
  }

}
