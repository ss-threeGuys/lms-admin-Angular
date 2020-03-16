import { Component, OnInit } from '@angular/core';
import { BookService } from '../../service/book.service';
import { AuthorService } from '../../service/author.service'
import { Book } from '../../domain/book';
import { SelectItem } from 'primeng/api';
import { GenreService } from '../../service/genre.service';
import { PublisherService } from '../../service/publisher.service';


export class BooksOutput {
  constructor(
    public _id?,
    public title?,
    public authorNames?,
    public authorIds?,
    public genreNames?,
    public genreIds?,
    public publisherName?,
    public publisherId?) { }
}

export class PrimeBook {
  constructor(
    public _id?,
    public title?,
    public authors?,
    public genres?,
    public publisher?
  ) { }
}


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  displayDialog: boolean;

  book: Book;

  booksOutput: BooksOutput

  outputBooks = []

  selectedBook: BooksOutput;

  newBook: boolean;

  cols: any[];

  allAuthors: SelectItem[];

  allGenres: SelectItem[];

  allPublishers: SelectItem[];

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private genreService: GenreService,
    private publisherService: PublisherService
  ) { }

  ngOnInit() {
    this.bookService.getBooks().then(books => this.addBooksFromServiceToOutput(books))

    this.getAllAuthors();

    this.getAllGenres();

    this.getAllPublishers();

    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'authorNames', header: 'Authors' },
      { field: 'genreNames', header: 'Genres' },
      { field: 'publisherName', header: 'Publisher' }
    ];


  }

  addBooksFromServiceToOutput(books: Book[]) {
    books.forEach(book => {
      let _id = book._id
      let title = book.title;
      let authorNames = book.authors.map(author => author.name).join(", ")
      let authorIds = book.authors.map(author => author._id);
      let genreNames = book.genres.map(genre => genre.name).join(", ")
      let genreIds = book.genres.map(genre => genre._id)
      let publisherName = book.publisher ? book.publisher.name : null;
      let publisherId = book.publisher ? [book.publisher._id] : null;

      this.outputBooks.push(
        new BooksOutput(
          _id,
          title,
          authorNames,
          authorIds,
          genreNames,
          genreIds,
          publisherName,
          publisherId
        ));
    })
    console.log("output books after get" + JSON.stringify(this.outputBooks));

  }

  getAllAuthors() {
    this.authorService.getAuthors().then(authors => {
      this.allAuthors = authors.map(author => ({ label: author.name, value: author._id }));

    })
  }

  getAllGenres() {

    this.genreService.getGenres().then(genres => {
      this.allGenres = genres.map(genre => ({ label: genre.name, value: genre._id }));
    })

  }

  getAllPublishers() {
    this.publisherService.getPublishers().then(publishers => {
      this.allPublishers = publishers.map(publisher => ({ label: publisher.name, value: publisher._id }));
    })
  }

  showDialogToAdd() {
    this.newBook = true;
    this.book = new BooksOutput();
    this.displayDialog = true;
  }

  save() {

    let books: BooksOutput[] = [...this.outputBooks];
    if (this.newBook) {
      console.log("this.book" + JSON.stringify(this.book));

      this.bookService.createBook(this.book)
        .then(book => {
          console.log("book after create" + JSON.stringify(book))
          let authorNames = book.authors.map(author => author.name).join(", ")
          let authorIds = book.authors.map(author => author._id);
          let genreNames = book.genres.map(genre => genre.name).join(", ")
          let genreIds = book.genres.map(genre => genre._id)
          let publisherName = book.publisher ? book.publisher.name : null;
          let publisherId = book.publisher ? [book.publisher._id] : null;
          books.push(new BooksOutput(book._id, book.title, authorNames, authorIds, genreNames, genreIds, publisherName, publisherId));
          this.outputBooks = books;
          this.book = null;
          this.displayDialog = false;
        })

    } else {

      this.bookService.updateBook(this.book)
        .then(() => {
          this.outputBooks = [];
          this.bookService.getBooks().then(_books => {
            this.addBooksFromServiceToOutput(_books)
            this.book = null;
            this.displayDialog = false
          })
        })
    }
  }




  delete() {
    this.bookService.deleteBook(this.book)
      .then(() => {
        let index = this.outputBooks.indexOf(this.selectedBook);
        this.outputBooks = this.outputBooks.filter((val, i) => i != index);
        this.book = null;
        this.displayDialog = false;
      })
  }


  onRowSelect(event) {
    console.log("selected book: " + JSON.stringify(this.selectedBook));
    console.log(this.outputBooks.indexOf(this.selectedBook));
    this.newBook = false;
    console.log("event: " + JSON.stringify(event.data));
    this.book = this.cloneBook(event.data);
    this.displayDialog = true;
  }

  cloneBook(c: BooksOutput): PrimeBook {
    let book = new PrimeBook();
    book._id = c._id;
    book.title = c.title;
    book.authors = c.authorIds;
    book.genres = c.genreIds;
    book.publisher = c.publisherId ? c.publisherId : [];
    return book;
  }

}
