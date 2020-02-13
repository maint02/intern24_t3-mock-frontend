import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { SharedModule } from '../../shared/shared.module';
import { IssuesComponent } from './issues/issues.component';
import { IssueModalComponent } from './issue-modal/issue-modal.component';
import { IssueInsertComponent } from './issue-insert/issue-insert.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { IssueMngComponent } from './issue-mng.component';
import { IssueSingleComponent } from './issue-single/issue-single.component';
import { UploadDemoComponent } from './upload-demo/upload-demo.component';

@NgModule({
  declarations: [IssuesComponent, IssueModalComponent, IssueInsertComponent, IssueMngComponent, IssueSingleComponent, UploadDemoComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    GridModule,
    ReactiveFormsModule,
    CKEditorModule,
    RouterModule.forChild([
      {
        path: '',
        component: IssueMngComponent,
        data: { breadcrumbs: ['QuanLyIssues', ''] },
        children: [
          { path: 'list-by-project/:projectId', component: IssuesComponent},
          { path: 'list-issue', component: IssuesComponent},
          { path: 'add-issue', component: IssueInsertComponent },
          { path: 'view-issue/:issueId', component: IssueSingleComponent },
          { path: 'upload', component: UploadDemoComponent },
        ]
      },
    ])
  ],

  entryComponents: [IssueModalComponent]
})
export class QuanLyIssuesModule {}
