import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../model/project.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IssueModel } from '../model/issue.model';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectService} from '../../../core/service/project.service';
import { StatusService} from '../../../core/service/status.service';
import { IssueService} from '../../../core/service/issue.service';
import { StatusModel } from '../model/status.model';
import { DateFormatter } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService} from '../../../core/service/file.service';


@Component({
  selector: 'smart-issue-insert',
  templateUrl: './issue-insert.component.html',
  styleUrls: ['./issue-insert.component.css']
})
export class IssueInsertComponent implements OnInit {
  addIssueForm: FormGroup;
  submitted = false;
  projectIdSelected: number;
  listProject: ProjectModel[] = [];
  listStatus: StatusModel[] = [];
  public Editor = ClassicEditor;
  issue: IssueModel = new IssueModel();
  fileList: FileList;

  startDateChoose: any ;
  constructor(
    private projectService: ProjectService,
    private statusService: StatusService,
    private issueService: IssueService,
    private formBuilder: FormBuilder,
    private fileService: FileService
  ) { }

  ngOnInit() {
    this.getAllProject();
    this.getAllStatusOfIssue();
    this.createForm();
  }
  createForm() {
    this.addIssueForm = this.formBuilder.group({
      name:  ['', Validators.required],
      project: ['', Validators.required],
    });
  }
  getAllProject() {
    this.projectService.getAll().subscribe((res: any) => {
      if (res.responseCode === 1) {
        this.listProject = res.dataResponse;
      }
    });
  }
  getAllStatusOfIssue() {
    this.statusService.getByTypeId(1).subscribe((res: any) => {
      if (res.responseCode === 1) {
        this.listStatus = res.dataResponse;
      }
    });
  }
  handlerProjectIdSelected(event: any) {
    console.log(event.target.value);
    this.issue.projectId = event.target.value;
  }
  doAdd() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.addIssueForm.invalid) {
        return;
    }
    console.log(this.startDateChoose);
    const date = new Date(this.startDateChoose.year,
    this.startDateChoose.month - 1, this.startDateChoose.day + 1).toISOString();
    this.issue.startDate = date;
    this.issue.employeeReportedId = 1;
    this.issue.dueDate = 0;
    this.issue.donePercent = 0;
    this.issueService.add(this.issue).subscribe((res: any) => {
      if (res.responseCode === 1) {
        console.log('thêm thành công!');
        alert('thêm thành công!');
        window.location.reload();
      } else {
        console.log('thêm thất bại');
      }
    });
    console.log(this.issue);
  }
  //  onChange( { editor }: ChangeEvent ) {
  //   this.issue.description = editor.getData();
  //   console.log(editor.getData());
  // }
  handlerTypeSelected(event: any) {
   this.issue.type = event.target.value;
  }
  handlerPrioritySelected(event: any) {
  this.issue.priority = event.target.value;
  }
  handlerStatusIdSelected(event: any) {
  this.issue.statusId = event.target.value;
  }
  handlerDate() {
  }
  xulyFile(event: any) {
    const file: File = event.target.files[0];
    if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      this.fileList = event.target.files;
    } else {
      alert('Cần phải chọn file exel để Import');
      this.fileList=null;
      event.target.value = null;
    }
  }
  saveFileExel() {
    const file: File = this.fileList[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.fileService.uploadIssueFromFileExel(formData).subscribe((res: any) => {
      if (res.responseCode === 1 || res.responseCode === 2) {
        console.log(res);
        alert(res.message);
      } else {
        alert('có lỗi không xác định!');
      }
    });
  }
}
