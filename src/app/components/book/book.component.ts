import { Component, OnInit } from '@angular/core';
import { BookService } from '../../service/book.service';
import { AuthorService } from '../../service/author.service'
import { Book } from '../../domain/book';
import { SelectItem } from 'primeng/api';
import { GenreService } from '../../service/genre.service';
import { PublisherService } from '../../service/publisher.service';
import { Validators, FormControl} from '@angular/forms';


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

  outputBooks : BooksOutput[] = []
  
  selectedBook: BooksOutput;

  newBook: boolean;

  cols: any[];

  allAuthors: SelectItem[];

  allGenres: SelectItem[];

  allPublishers: SelectItem[];

 bookForm = {
    title: new FormControl('', Validators.required),
    authors : new FormControl([]),
    genres : new FormControl([]), 
    publisher : new FormControl([])
}

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private genreService: GenreService,
    private publisherService: PublisherService
  ) { }

  ngOnInit() {
   
    this.getAllAuthors();

    this.getAllGenres();

    this.getAllPublishers();

    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'authorNames', header: 'Authors' },
      { field: 'genreNames', header: 'Genres' },
      { field: 'publisherName', header: 'Publisher' }
    ];

    this.bookService.getBooks().subscribe(books => this.outputBooks = this.addBooksFromServiceToOutput(books))
   }

  addBooksFromServiceToOutput(books: Book[]) {
    const outputBooks = []
    books.forEach(book => {
      let _id = book._id
      let title = book.title;
      let authorNames = book.authors.map(author => author.name).join(", ")
      let authorIds = book.authors.map(author => author._id);
      let genreNames = book.genres.map(genre => genre.name).join(", ")
      let genreIds = book.genres.map(genre => genre._id)
      let publisherName = book.publisher ? book.publisher.name : null;
      let publisherId = book.publisher ? [book.publisher._id] : null;

      outputBooks.push(
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
    return outputBooks;
  }

  getAllAuthors() {
    this.authorService.getAuthors().subscribe(authors => {
      this.allAuthors = authors.map(author => ({ label: author.name, value: author._id }));

    })
  }

  getAllGenres() {

    this.genreService.getGenres().subscribe(genres => {
      this.allGenres = genres.map(genre => ({ label: genre.name, value: genre._id }));
    })

  }

  getAllPublishers() {
    this.publisherService.getPublishers().subscribe(publishers => {
      this.allPublishers = publishers.map(publisher => ({ label: publisher.name, value: publisher._id }));
    })
  }

  showDialogToAdd() {
    this.newBook = true;
    this.book = new BooksOutput();
    this.displayDialog = true;
  }

  save() {
    console.log(this.bookForm);
    console.log(this.book);
    this.book = {...this.book, 
      title : this.bookForm.title.value, 
      authors : this.bookForm.authors.value,
      genres : this.bookForm.genres.value,
      publisher : this.bookForm.publisher.value}

    let books: BooksOutput[] = [...this.outputBooks];
    if (this.newBook) {
      console.log("this.book" + JSON.stringify(this.book));

      this.bookService.createBook(this.book)
        .subscribe(book => {
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
          this.bookForm.title.setValue('');
          this.bookForm.authors.setValue([]);
          this.bookForm.genres.setValue([]);
          this.bookForm.publisher.setValue([]);

          this.displayDialog = false;
        })

    } else {

      this.bookService.updateBook(this.book)
        .subscribe(() => {
          this.outputBooks = [];
          this.bookService.getBooks().subscribe(_books => {
            this.outputBooks = this.addBooksFromServiceToOutput(_books)
            this.book = null;
            this.displayDialog = false
            this.bookForm.title.setValue('');
            this.bookForm.authors.setValue([]);
            this.bookForm.genres.setValue([]);
            this.bookForm.publisher.setValue([]);
          })
        })
    }
  }




  delete() {
    this.bookService.deleteBook(this.book)
      .subscribe(() => {
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
    this.bookForm.title.setValue(c.title);
    book.title = c.title;
    this.bookForm.authors.setValue(c.authorIds);
    book.authors = c.authorIds;
    this.bookForm.genres.setValue(c.genreIds);
    book.genres = c.genreIds;
    this.bookForm.publisher.setValue(c.publisherId);
    book.publisher = c.publisherId ? c.publisherId : [];
    return book;
  }

}
