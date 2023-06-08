import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private _url: string = 'https://api.github.com/orgs/microsoft/repos'

  constructor(private http: HttpClient) { }

  loadRepos(perPage: number = 10, page: number = 1, sort: string = '', sortDirection: string = '') {
    return this.http.get(`${this._url}?per_page=${perPage}&page=${page}&sort=${sort}&direction=${sortDirection}`)
  }
  loadTotal() {
    return this.http.get('https://api.github.com/orgs/microsoft')
  }
  loadIssues(repoName: string) {
    return this.http.get(`https://api.github.com/repos/Microsoft/${repoName}/issues?per_page=5&sort=created`)
  }
}
