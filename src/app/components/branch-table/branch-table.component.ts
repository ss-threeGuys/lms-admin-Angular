import { Component, OnInit } from "@angular/core";
import { Branch } from "src/app/domain/branch";
import { BranchService } from "src/app/service/branch.service";

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

  constructor(private branchService: BranchService) {}

  ngOnInit() {
    this.branchService.getBranches().then(branches => {
      return (this.branches = branches);
    });
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

    if (this.newBranch) branches.push(this.branch);
    else branches[this.branches.indexOf(this.selectedBranch)] = this.branch;

    this.branches = branches;
    this.branch = null;
    this.displayDialog = false;
  }

  delete() {
    console.log(this.branch);
    this.branchService.deleteBranch(this.branch).then(() => {
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
}
