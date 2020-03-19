import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Branch } from "../domain/branch";
import { environment } from "src/environments/environment";

const baseHost = environment.crudUrls.baseHost,
  basePort = environment.crudUrls.basePort,
  prefix = environment.crudUrls.prefix,
  url = environment.crudUrls.branches.url;

const baseURL = `http://${baseHost}:${basePort}${prefix}${url}`;
@Injectable({
  providedIn: "root"
})
export class BranchService {
  constructor(private http: HttpClient) {}

  getBranchesWithPaging(sortField, sortOrder, currentPage, pageSize) {
    return this.http.get<any>(
      `${baseURL}/paging?sortField=${sortField}&sortOrder=${sortOrder}&currentPage=${currentPage}&pageSize=${pageSize}`
    );
  }

  createBranch(branch) {
    return this.http.post<Branch>(baseURL, branch);
  }

  updateBranch(branch) {
    return this.http.put(`${baseURL}/${branch._id}`, branch);
  }

  deleteBranch(branch) {
    return this.http.delete(`${baseURL}/${branch._id}`);
  }
}
