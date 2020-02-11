import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IssueModel } from '../model/issue.model';
import { TeamProjectService } from '../../../core/service/TeamProject.service';
import { EmployeeIssueService } from '../../../core/service/employeeIssue.service';
import { EmployeeModel } from '../model/employee.model';
import { TeamProjectModel } from '../model/TeamProject.model';
import { EmployeeIssueModel } from '../model/employeeIssue.model';

@Component({
  selector: 'smart-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.css']
})
export class IssueModalComponent implements OnInit {
  @Input() action;
  @Input() id;
  @Input() issues: IssueModel;
  employeeOfProjectSelected: EmployeeModel = new EmployeeModel();
  employeeIssue: EmployeeIssueModel = new EmployeeIssueModel();
  empIdSelected: number;
  constructor(
    private activeModal: NgbActiveModal,
    private teamProjectService: TeamProjectService,
    private EmpIssueService: EmployeeIssueService
  ) {}

  ngOnInit() {
    this.getMemberByProjectId(this.issues.projectId);
  }
  doAssignIssue() {
    const check: boolean = confirm('bạn giao issue cho user:' + this.empIdSelected);
    if (check) {
      this.employeeIssue.issueId = this.issues.id;
      this.employeeIssue.employeeId = this.empIdSelected;
      this.employeeIssue.statusId = 1;
      this.employeeIssue.employeeAssignedId = 1;
      console.log(this.employeeIssue);
      this.EmpIssueService.save(this.employeeIssue).subscribe((res: any) => {
      if (res.responseCode === 1) {
        alert('assign issue thành công!');
        this.activeModal.close();
      } else {
        alert('đã giao cho nhân viên này rồi ');
        this.activeModal.close();
      }
    });
    } else {
      console.log('thôi giao việc');
    }
  }

  getMemberByProjectId(id: number) {
    this.teamProjectService.getAllIdMemberByProjectId(id).subscribe(res => {
      if (res.responseCode === 1) {
        this.employeeOfProjectSelected = res.dataResponse;
      }
    });
  }
  handlerEmpIdSelected(event: any) {
    console.log(event.target.value);
    this.empIdSelected = event.target.value;
  }
}
