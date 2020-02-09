import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../../core/service/issue.service';
import { IssueModel } from '../model/issue.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'smart-issue-single',
  templateUrl: './issue-single.component.html',
  styleUrls: ['./issue-single.component.css']
})
export class IssueSingleComponent implements OnInit {
  issues: IssueModel = new IssueModel;

  constructor(
    private issueService: IssueService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    if (this.route.params != null) {
      const id = this.route.snapshot.params.issueId;
      this.issueService.getById(id).subscribe((res: any) => {
        if (res.responseCode === 1) {
          this.issues = res.dataResponse;
        }
      });
    }
  }

}
