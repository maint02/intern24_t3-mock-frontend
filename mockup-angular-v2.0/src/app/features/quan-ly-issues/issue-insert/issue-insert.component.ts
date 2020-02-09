import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../model/project.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IssueModel } from '../model/issue.model';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectService} from '../../../core/service/project.service';
import { StatusService} from '../../../core/service/status.service';
import { StatusModel } from '../model/status.model';


@Component({
  selector: 'smart-issue-insert',
  templateUrl: './issue-insert.component.html',
  styleUrls: ['./issue-insert.component.css']
})
export class IssueInsertComponent implements OnInit {
  projectIdSelected: number;
  listProject: ProjectModel[] = [];
  listStatus: StatusModel[] = [];
  public Editor = ClassicEditor;
  issue: IssueModel = new IssueModel;
  constructor(
    private projectService: ProjectService,
    private statusService: StatusService
  ) { }

  ngOnInit() {
    this.getAllProject();
    this.getAllStatusOfIssue();
  }
  getAllProject() {
    this.projectService.getAll().subscribe((res: any) => {
      if (res.responseCode === 1) {
        this.listProject = res.dataResponse;
      }
    });
  }
  getAllStatusOfIssue(){
    this.statusService.getByTypeId(1).subscribe((res: any) =>{
      if (res.responseCode === 1) {
        this.listStatus = res.dataResponse;
      }
    });
  }
  handlerProjectIdSelected(event: any) {
    console.log(event.target.value);
    this.issue.projectId = event.target.value;
  }
  doAdd(){
    console.log(this.issue);
  }
   onChange( { editor }: ChangeEvent ) {
    this.issue.description= editor.getData();
    console.log(editor.getData());
  }
  handlerTypeSelected(event: any){
   this.issue.type = event.target.value;
  }
  handlerPrioritySelected(event: any){
  this.issue.priority = event.target.value;
  }
  handlerStatusIdSelected(event: any){
  this.issue.statusId=event.target.value;
  }
}
