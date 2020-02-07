import { Component, OnInit } from '@angular/core';
import { ProjectModel } from '../model/project.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { IssueModel } from '../model/issue.model';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'smart-issue-insert',
  templateUrl: './issue-insert.component.html',
  styleUrls: ['./issue-insert.component.css']
})
export class IssueInsertComponent implements OnInit {
  public apiAllProject = 'http://localhost:8082/api/project/get-All';
  projectIdSelected: number;
  listProject: ProjectModel[] = [];
  public Editor = ClassicEditor;
  issue: IssueModel = new IssueModel;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.http.get(this.apiAllProject).subscribe((res: any) => {
      if (res.responseCode === 1) {
        this.listProject = res.dataResponse;
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
}
