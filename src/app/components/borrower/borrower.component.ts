import { Component, OnInit } from '@angular/core';
import { Borrower } from 'src/app/domain/borrower';
import { BorrowerService } from 'src/app/service/borrower.service';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  styleUrls: ['./borrower.component.css']
})
export class BorrowerComponent implements OnInit {

  displayDialog: boolean;
  borrower: Borrower = {};
  selectedBorrower: Borrower;
  newBorrower: boolean;
  borrowers: Borrower[];
  cols: any[];
  totalRecords: number;
  rowsNumber: number;
  currentPage: number;

  constructor(private borrowerService: BorrowerService) {
    this.currentPage = 1;
    this.rowsNumber = 4;
   }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: "Name"},
      { field: 'address', header: 'Address'},
      { field: 'phone', header: 'Phone'}
    ];
  }

  loadBorrowersLazy(event: LazyLoadEvent) {
    this.currentPage = 1 + (event.first / this.rowsNumber);
    this.borrowerService.getBorrowers(this.currentPage, this.rowsNumber, event.sortField, event.sortOrder).subscribe(res => {
      this.totalRecords = res[res.length - 1].__paging.count;
      res.pop();
      return (this.borrowers = [...res]);
    });
  }

  showDialogToAdd() {
    this.newBorrower = true;
    this.borrower = {};
    this.displayDialog = true;
  }

  save() {
    let borrowers = [...this.borrowers];

    if (this.newBorrower) {
      this.borrowerService.createBorrower(this.borrower).subscribe(() => {
        borrowers.push(this.borrower);
        this.borrowers = borrowers;
        this.borrower = null;
        this.displayDialog = false;
      });
    }
    else {
      this.borrowerService.updateBorrower(this.borrower).subscribe(() => {
        borrowers[this.borrowers.indexOf(this.selectedBorrower)] = this.borrower;
        this.borrowers = borrowers;
        this.borrower = null;
        this.displayDialog = false;
      });
    }
  }

  delete() {
    this.borrowerService.deleteBorrower(this.borrower).subscribe(() => {
      let index = this.borrowers.indexOf(this.selectedBorrower);
      this.borrowers = this.borrowers.filter((_, i) => i != index);
      this.borrower = null;
      this.displayDialog = false;
    });
  }

  onRowSelect(event) {
    this.newBorrower = false;
    this.borrower = this.cloneBorrower(event.data);
    this.displayDialog = true;
  }

  cloneBorrower(g: Borrower): Borrower {
    let borrower = {};
    for (let prop in g) {
      borrower[prop] = g[prop];
    }
    return borrower;
  }

}
