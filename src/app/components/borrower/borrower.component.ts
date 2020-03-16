import { Component, OnInit } from '@angular/core';
import { Borrower } from 'src/app/domain/borrower';
import { BorrowerService } from 'src/app/service/borrower.service';

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

  constructor(private borrowerService: BorrowerService) { }

  ngOnInit() {
    this.borrowerService.getBorrowers().then(borrowers => {
      return (this.borrowers = borrowers);
    });
    this.cols = [
      { field: 'name', header: "Name"},
      { field: 'address', header: 'Address'},
      { field: 'phone', header: 'Phone'}
    ];
  }

  showDialogToAdd() {
    this.newBorrower = true;
    this.borrower = {};
    this.displayDialog = true;
  }

  save() {
    let borrowers = [...this.borrowers];

    if (this.newBorrower) {
      this.borrowerService.createBorrower(this.borrower).then((borrower) => {
        borrowers.push(borrower);
        this.borrowers = borrowers;
        this.borrower = null;
        this.displayDialog = false;
      });
    }
    else {
      this.borrowerService.updateBorrower(this.borrower).then(() => {
        borrowers[this.borrowers.indexOf(this.selectedBorrower)] = this.borrower;
        this.borrowers = borrowers;
        this.borrower = null;
        this.displayDialog = false;
      });
    }
  }

  delete() {
    this.borrowerService.deleteBorrower(this.borrower).then(() => {
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
