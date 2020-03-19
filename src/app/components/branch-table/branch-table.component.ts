import { Component, OnInit } from "@angular/core";
import { Branch } from "src/app/domain/branch";
import { BranchService } from "src/app/service/branch.service";
import { LazyLoadEvent } from "primeng/api";

@Component({
  selector: "app-branch-table",
  templateUrl: "./branch-table.component.html",
  styleUrls: ["./branch-table.component.css"]
})
export class BranchTableComponent implements OnInit {
  displayDialog: boolean;
  branch: Branch = {};
  selectedBranch: Branch;
  newBranch: boolean;
  branches: Branch[];
  cols: any[];
  loading: boolean;
  totalRecords;
  currentPage: number = 1;
  pageSize: number = 15;

  constructor(private branchService: BranchService) {}

  ngOnInit() {
    this.cols = [
      { field: "branchName", header: "Branch Name" },
      { field: "branchAddress", header: "Branch Address" }
    ];
  }

  showDialogToAdd() {
    this.newBranch = true;
    this.branch = {};
    this.displayDialog = true;
  }

  save() {
    let branches = [...this.branches];

    if (this.newBranch) {
      this.branchService.createBranch(this.branch).subscribe(branch => {
        branches.push(branch);
        this.branches = branches;
        this.branch = null;
        this.displayDialog = false;
      });
    } else {
      this.branchService.updateBranch(this.branch).subscribe(() => {
        branches[this.branches.indexOf(this.selectedBranch)] = this.branch;
        this.branches = branches;
        this.branch = null;
        this.displayDialog = false;
      });
    }
  }

  delete() {
    this.branchService.deleteBranch(this.branch).subscribe(() => {
      let index = this.branches.indexOf(this.selectedBranch);
      this.branches = this.branches.filter((val, i) => i != index);
      this.branch = null;
      this.displayDialog = false;
    });
  }

  onRowSelect(event) {
    this.newBranch = false;
    this.branch = this.cloneBranch(event.data);
    this.displayDialog = true;
  }

  cloneBranch(c: Branch): Branch {
    let branch = {};
    for (let prop in c) {
      branch[prop] = c[prop];
    }
    return branch;
  }

  loadBranchesLazy(event: LazyLoadEvent) {
    this.loading = true;
    this.currentPage = 1 + event.first / this.pageSize;

    this.branchService
      .getBranchesWithPaging(
        event.sortField,
        event.sortOrder,
        this.currentPage,
        this.pageSize
      )
      .subscribe(branches => {
        let pagingData = branches.pop();

        this.totalRecords = pagingData.__paging.count;
        this.loading = false;
        this.branches = branches;
      });
  }
}
