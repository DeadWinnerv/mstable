import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IIssue } from 'src/app/interfaces/issue';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
})
export class IssuesComponent implements OnInit {
  isLoading: boolean;
  issues: IIssue[] = [];

  @Input() repositoryName: string;
  @Output() modelClosedEvent = new EventEmitter<void>();

  constructor(private gitHubService: GithubService) {}

  ngOnInit(): void {
    this.loadIssues(this.repositoryName);
  }

  loadIssues(repoName: string) {
    this.isLoading = true;
    this.gitHubService.loadIssues(repoName).subscribe(
      (issues: any) => {
        if (!issues.length) {
          this.issues = [];
        } else {
          this.issues = issues.map((issue: IIssue) => ({
            updated_at: issue.updated_at,
            title: issue.title,
            body: issue.body,
          }));
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error('An error occurred while loading issues:', error);
        this.isLoading = false;
      }
    );
  }
  

  closeModal() {
    this.modelClosedEvent.emit();
  }
}
