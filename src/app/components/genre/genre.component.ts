import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/domain/genre';
import { GenreService } from 'src/app/service/genre.service';

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

  constructor(private genreService: GenreService) { }

  ngOnInit() {
    this.genreService.getGenres().then(genres => {
      return (this.genres = genres);
    });
    this.cols = [
      { field: 'name', header: "Name"}
    ];
  }

  showDialogToAdd() {
    this.newGenre = true;
    this.genre = {};
    this.displayDialog = true;
  }

  save() {
    let genres = [...this.genres];

    if (this.newGenre) {
      this.genreService.createGenre(this.genre).then(() => {
        genres.push(this.genre);
        this.genres = genres;
        this.genre = null;
        this.displayDialog = false;
      });
    }
    else {
      this.genreService.updateGenre(this.genre).then(() => {
        genres[this.genres.indexOf(this.selectedGenre)] = this.genre;
        this.genres = genres;
        this.genre = null;
        this.displayDialog = false;
      });
    }
  }

  delete() {
    this.genreService.deleteGenre(this.genre).then(() => {
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
