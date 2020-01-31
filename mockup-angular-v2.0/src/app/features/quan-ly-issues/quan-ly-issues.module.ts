import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { SharedModule } from '../../shared/shared.module';
import { IssuesMngComponent } from '../quan-ly-issues/issues-mng/issues-mng.component';
import { ListIssuesComponent } from './list-issues/list-issues.component';
import { IssuesComponent } from './issues/issues.component';
import { IssueModalComponent } from './modal/modal.component';
@NgModule({
  declarations: [IssuesMngComponent, ListIssuesComponent, IssuesComponent, IssueModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    GridModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'issues-manager' },
      // {
      //   path: 'issue-mng',
      //   component: IssuesMngComponent,
      //   children: [{ path: 'list-by-project/:projectId', component: ListIssuesComponent }]
      // },
      { path: 'issues-manager', component: IssuesComponent,
      children: [{ path: 'list-by-project/:projectId', component: IssuesComponent }]
    },
    ])
  ],
  entryComponents: [IssueModalComponent]
})
export class QuanLyIssuesModule {}
