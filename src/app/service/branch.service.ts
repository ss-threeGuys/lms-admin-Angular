import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Branch } from "../domain/branch";

@Injectable({
  providedIn: "root"
})
export class BranchService {
  constructor(private http: HttpClient) {}

  getBranches() {
    return this.http
      .get<any>("http://localhost:3000/admin/branches")
      .toPromise()
      .then(res => <Branch[]>res)
      .then(data => data);
  }
}
