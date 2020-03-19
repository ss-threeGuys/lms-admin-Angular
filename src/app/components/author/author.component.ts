import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthorService } from '../../service/author.service';
import { Author } from '../../domain/author';
import { Validators, FormControl } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';

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

  @ViewChild('dt') private tableElement: any;

  displayDialog: boolean;

  author: Author;

  selectedAuthor: Author;

  newAuthor: boolean;

  authors: Author[];

  cols: any[];

  nameField: FormControl = new FormControl('', Validators.required);

  _sortField;

  _sortOrder;
  
  _currentPage;

  _pageSize = 10;

  _count;

  constructor(private authorService: AuthorService) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' }
    ]
  }

  protected ngAfterViewInit() {
    this.tableElement.onSort.subscribe(data => {
      
      this._sortField = data.field;
      this._sortOrder = data.order;
    });
  }

  protected onLoadData(event: LazyLoadEvent) {
    console.log(event);
    this._currentPage = 1+(event.first/this._pageSize); 
    this.authorService.getAuthorsPaging(
      event.sortField, event.sortOrder, this._currentPage, this._pageSize
      ).subscribe(authors => { 
 
      let paging = authors.pop();
     
      this._count = paging.__paging.count;
      console.log(this._count);

      return this.authors = authors 
    
    });


  }






  showDialogToAdd() {
    this.newAuthor = true;
    this.author = new PrimeAuthor();
    this.displayDialog = true;
  }

  save() {

    let authors = [...this.authors];
    if (this.newAuthor) {
      this.authorService.createAuthor({ "name": this.nameField.value })
        .subscribe(author => {
          authors.push(author);
          this.authors = authors;
          this.nameField.setValue(null);
          this.displayDialog = false;
        })

    } else {

      this.author = { ...this.author, "name": this.nameField.value }

      this.authorService.updateAuthor(this.author)
        .subscribe(() => {
          authors[this.authors.indexOf(this.selectedAuthor)] = this.author;
          this.authors = authors;
          this.author = null;
          this.displayDialog = false;
        })
    }

  }

  delete() {
    this.authorService.deleteAuthor(this.author)
      .subscribe(() => {
        let index = this.authors.indexOf(this.selectedAuthor);
        this.authors = this.authors.filter((val, i) => i != index);
        this.author = null;
        this.displayDialog = false;
      })
  }


  onRowSelect(event) {
    this.newAuthor = false;
    console.log(event.data);
    this.author = this.cloneAuthor(event.data);
    this.nameField.setValue(event.data.name);
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
