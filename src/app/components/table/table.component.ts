import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IRepository } from 'src/app/interfaces/repository';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  isLoading: boolean;
  tableSource: IRepository[] = []
  displayedColumns: string[] = ['name', 'language', 'lastPush', 'isArchived', 'repositoryUrl']
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;

  constructor(private gitHubService: GithubService) {
    this.loadRepositories()
    this.loadTotalCount()
  }

  loadRepositories(perPage: number = 10, page: number = 1) {
    this.isLoading = true;
    this.gitHubService.loadRepos(perPage, page).subscribe(
      (repos: any) => {
        console.log(repos);
        this.tableSource = repos.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          language: repo.language,
          lastPush: repo.pushed_at,
          isArchived: repo.archived,
          repositoryUrl: repo.html_url
        }))
        this.isLoading = false;
      }
    )
  }

  loadTotalCount() {
    this.isLoading = true;
    this.gitHubService.loadTotal().subscribe((org: any) => this.totalItems = org.public_repos)
    this.isLoading = false;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize
    this.loadRepositories(this.itemsPerPage, this.currentPage)
  }
}
