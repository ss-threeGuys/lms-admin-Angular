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

  getBranches() {
    return this.http
      .get<any>(baseURL)
      .toPromise()
      .then(res => <Branch[]>res)
      .then(data => data);
  }

  createBranch(branch) {
    return this.http
      .post<Branch>(baseURL, branch)
      .toPromise()
      .then(data => data);
  }

  updateBranch(branch) {
    return this.http.put(`${baseURL}/${branch._id}`, branch).toPromise();
  }

  deleteBranch(branch) {
    return this.http.delete(`${baseURL}/${branch._id}`).toPromise();
  }
}
