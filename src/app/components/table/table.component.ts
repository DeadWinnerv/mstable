import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IRepository } from 'src/app/interfaces/repository';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  isLoading: boolean;
  dataSource = new MatTableDataSource<IRepository[]>([]);
  displayedColumns: string[] = [
    'name',
    'language',
    'pushed_at',
    'archived',
    'html_url',
  ];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  highlightedIndex: number;
  totalItems: number;
  isModalOpened: boolean = false;
  modalRepositoryName: string = '';
  sortValue: string = '';
  sortDirection: string = '';

  @ViewChild(MatSort) sort: MatSort;

  constructor(private gitHubService: GithubService) {
    this.loadTotalCount();
    this.loadRepositories();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadRepositories(
  ) {
    this.isLoading = true;
    this.dataSource.data = [];
    this.gitHubService.loadRepos(this.itemsPerPage, this.currentPage, this.sortValue, this.sortDirection).subscribe(
      (repos: any) => {
        this.dataSource.data = repos.map((repo: IRepository) => ({
          name: repo.name,
          language: repo.language,
          pushed_at: repo.pushed_at,
          archived: repo.archived,
          html_url: repo.html_url,
        }));
  
        this.isLoading = false;
      },
      (error: any) => {
        console.error('An error occurred while loading repositories:', error);
        this.isLoading = false;
      }
    );
  }

  loadTotalCount() {
    this.gitHubService
      .loadTotal()
      .subscribe((org: any) => (this.totalItems = org.public_repos));
  }

  onPageChange(event: PageEvent) {
      this.currentPage = event.pageIndex + 1;
      this.itemsPerPage = event.pageSize;
      this.loadRepositories();
  }

  handleSortChange(sortState: Sort | any) {
    if (sortState.direction) {
      this.sortDirection = sortState.direction;
      this.sortValue = sortState.active;
      this.loadRepositories();
    } else {
      this.sortDirection = '';
      this.sortValue = '';
      this.loadRepositories();
    }
  }

  highlightRow(index: number) {
    this.highlightedIndex = index;
  }

  openModal(repoName: string) {
    this.isLoading = true;
    this.modalRepositoryName = repoName;
    this.isModalOpened = true;
    this.isLoading = false;
  }

  closeModal() {
    this.isModalOpened = false;
  }
}
