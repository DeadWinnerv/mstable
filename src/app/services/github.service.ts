import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private _url: string = 'https://api.github.com/orgs/microsoft/repos'

  constructor(private http: HttpClient) { }

  loadRepos(perPage: number = 10, page: number = 1) {
    return this.http.get(`${this._url}?per_page=${perPage}&page=${page}`)
  }
  loadTotal() {
    return this.http.get('https://api.github.com/orgs/microsoft')
  }
}
