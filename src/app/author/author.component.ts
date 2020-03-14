import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../author.service';
import { Author } from './domain/Author';

export class PrimeAuthor implements Author {
  constructor(public name?) { }
}

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
  providers: []
})
export class AuthorComponent implements OnInit {

  displayDialog: boolean;

  author: Author;

  selectedAuthor: Author;

  newAuthor: boolean;

  authors: Author[];

  cols: any[];

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    this.authorService.getAuthors().then(authors => { return this.authors = authors });


    this.cols = [
      { field: 'name', header: 'Name' },
    ];
  }

  showDialogToAdd() {
    this.newAuthor = true;
    this.author = new PrimeAuthor();
    this.displayDialog = true;
  }

  save() {

    let authors = [...this.authors];
    if (this.newAuthor) {
      this.authorService.createAuthor(this.author)
        .then(author => {
          authors.push(author);
          this.authors = authors;
          this.author = null;
          this.displayDialog = false;
        })

    } else {
      console.log(this.author);
      this.authorService.updateAuthor(this.author)
        .then(() => {
          authors[this.authors.indexOf(this.selectedAuthor)] = this.author;
          this.authors = authors;
          this.author = null;
          this.displayDialog = false;
        })
    }

  }

  delete() {
    this.authorService.deleteAuthor(this.author)
      .then(() => {
        let index = this.authors.indexOf(this.selectedAuthor);
        this.authors = this.authors.filter((val, i) => i != index);
        this.author = null;
        this.displayDialog = false;
      })
  }


  onRowSelect(event) {
    this.newAuthor = false;
    this.author = this.cloneAuthor(event.data);
    this.displayDialog = true;
  }

  cloneAuthor(c: Author): Author {
    let author = {};
    for (let prop in c) {
      author[prop] = c[prop];
    }
    return author;
  }

}
