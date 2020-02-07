import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IssueModel } from '../model/issue.model';

@Component({
  selector: 'smart-issue-modal',
  templateUrl: './issue-modal.component.html',
  styleUrls: ['./issue-modal.component.css']
})
export class IssueModalComponent implements OnInit {

  @Input() action;
  @Input() id;
  @Input() issues: IssueModel;
  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  updateIssue(id: number){
    alert('sửa thông tin id:'+ id);
  }
}
