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

@NgModule({
  declarations: [IssuesComponent, IssueModalComponent, IssueInsertComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    GridModule,
    ReactiveFormsModule,
    CKEditorModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'issues-manager', },
      // {
      //   path: 'issue-mng',
      //   component: IssuesMngComponent,
      //   children: [{ path: 'list-by-project/:projectId', component: ListIssuesComponent }]
      // },
      {
        path: 'issues-manager',
        component: IssuesComponent,
        data: { breadcrumbs: ['QuanLyIssues', ''] },
        children: [
          { path: 'list-by-project/:projectId', component: IssuesComponent },
        ]
      },
      { path: 'add-issue', component: IssueInsertComponent },
    ])
  ],

  entryComponents: [IssueModalComponent]
})
export class QuanLyIssuesModule {}
