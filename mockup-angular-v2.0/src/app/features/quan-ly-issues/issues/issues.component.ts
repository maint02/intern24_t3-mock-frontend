import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IssueModel } from '../model/issue.model';
import { ProjectModel } from '../model/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IssueModalComponent } from '../issue-modal/issue-modal.component';

@Component({
  selector: 'smart-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit, OnChanges {
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    // tslint:disable-next-line: ban-types
  ) {
    console.log('==== gọi constructor');
  }
  issueCheckedList: any;
  issueMasterSelected: boolean = false;
  issues: IssueModel[] = [];
  nameI ='abcs';
  issueSearchDto: IssueModel = new IssueModel;
  pageNumber: any;
  limit = 5;
  page: any = 1;
  pageOption: any = {
    pageSize: 1,

    totalRows: 3 // thay thế cái này bằng tổng page truyền từ api ra vì thư viện này ko hõ trợ tổng page
  };
  listProject: ProjectModel[] = [];
  projectIdSelected: any;
  listIdChecked: number[] = [];
  public apiCallIssues = 'http://localhost:8082/api/issue/get-by-project/';
  public apiAllProject = 'http://localhost:8082/api/project/get-All';
  public apiSearchIssueByParams = 'http://localhost:8082/api/issue/get-by-project/';
  ngOnInit() {
    // 1.load all project
    // 2. gán các biến cần thiết cho khởi tạo:
    console.log('==== OnInit: IssuesMngComponent');
    this.http.get(this.apiAllProject).subscribe((res: any) => {
      if (res.responseCode === 1) {
        this.listProject = res.dataResponse;
        this.pageOption.totalRows = 0;
        // this.projectIdSelected = this.listProject[0].id;
      }
    });
    // hàm checkDataRouterForSearch: kiểm tra url xem có page và id truyền vào không để gọi api
    this.checkDataRouterForSearch(this.route);
  }
  ngOnChanges() {
    console.log('===== ngOnChanges');
  }
  handlerProjectIdSelected(event: any) {
    console.log(event.target.value);
    this.projectIdSelected = event.target.value;
  }
  onPageChanged(event) {
    console.log(event);
    this.page = event.page;
    const myurl =
      'quan-ly-issues/issues-manager/list-by-project/' +
      this.projectIdSelected +
      '?page=' +
      this.page +
      '';
    console.log(myurl);
    this.router.navigateByUrl(myurl);
    this.route.firstChild.queryParams.subscribe(params => {
      this.page = params.page;
      //this.getApiByProjectId(this.page, this.limit, this.projectIdSelected);
      this.searchIssueByParams();
    });
    this.issueMasterSelected = false;
  }
  getApiByProjectId(page: number, limit: number, prId: number) {
    this.http
      .get(`${this.apiCallIssues}${prId}?page=${page}&limit=${limit}`)
      .subscribe((res: any) => {
        this.issues = res.dataResponse.listData;
        this.pageOption.totalRows = res.dataResponse.totalPage;
      });
  }
  getApiByProjectIdAndParams(page: number, limit: number, prId: number, issueSearchDto: IssueModel){
    this.http.post(`${this.apiSearchIssueByParams}${prId}/search/?page=${page}&limit=${limit}`,this.issueSearchDto)
    .subscribe((res: any ) => {
      if (res.responseCode === 1) {
        this.issues = res.dataResponse.listData;
        this.pageOption.totalRows = res.dataResponse.totalPage;
      } else {
        this.issues = [];
        this.pageOption.totalRows = 0;
      }
    });
  }
  doSearch() {
    this.page = 1;
    const myurl =
      'quan-ly-issues/issues-manager/list-by-project/' +
      this.projectIdSelected +
      '?page=' +
      this.page +
      '';
    console.log(myurl);
    this.router.navigateByUrl(myurl);
    this.getApiByProjectId(this.page, this.limit, this.projectIdSelected);
  }
  onCheckboxChange(event) {
    console.log(event);
    if (event.target.checked) {
      this.listIdChecked.push(event.target.value);
      console.log('list id:' + this.listIdChecked);
    } else {
      this.listIdChecked.forEach(id => {
        const vitri = this.listIdChecked.indexOf(id); // lấy index của id đó
        if (id === event.target.value) {
          this.listIdChecked.splice(vitri, 1); // xóa 1 phần tử trong list từ id đó
          console.log('list id:' + this.listIdChecked);
        }
      });
    }
  }
  checkUncheckAll() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.issues.length; i++) {
      this.issues[i].isSelected = this.issueMasterSelected;
    }
    this.getCheckedItemList();
    console.log(this.listIdChecked);
  }
  isAllSelected() {
    // tslint:disable-next-line: only-arrow-functions
    this.issueMasterSelected = this.issues.every(function(item: any) { //nếu tất cả đc check thì trả về true
        return item.isSelected == true; //nếu có một issue ko đc seleted thì false
      });
    this.getCheckedItemList();
    console.log(this.listIdChecked);
  }

  getCheckedItemList() {
    this.listIdChecked = [];
    for (let i = 0; i < this.issues.length; i++) {
      if (this.issues[i].isSelected) {
      this.listIdChecked.push(this.issues[i].id);
      }
    }
    //this.checkedList = JSON.stringify(this.checkedList);
  }
  doDelete() {
    // tslint:disable-next-line: ban-types
    const check: Boolean = confirm('bạn có muốn xóa không?');
    if (check) {
      console.log('làm xóa');
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        body: this.listIdChecked
      };
      this.http
        .delete('http://localhost:8082/api/issue', httpOptions)
        .subscribe((res: any) => {
          if (res.responseCode === 1) {
            this.listIdChecked = [];
            alert('xóa thành công');
            window.location.reload();
          } else {
            alert('xóa thất bại!');
          }
        });
    } else {
      console.log('thôi xóa');
    }
  }
  // hàm checkDataRouterForSearch: kiểm tra url xem có page và id truyền vào không để gọi api
  // 3. check xem param và queryparm  nhằm phân tran có  hay không?
  // 3.1 check router xem nó có firstchild ko?
  // 3.2 check firstchild xem nó có param và query param hay không?
  // 3.3 nếu có đầy đủ thì goi nếu có thì gọi api list Issue... không thì ko gọi!
  checkDataRouterForSearch(route: ActivatedRoute) {
    if (this.route.firstChild !== null) {
      console.log('có firstChild');
      if (this.route.firstChild.params !== null) {
        console.log('có param');
        const projectIdUrl = this.route.firstChild.snapshot.params.projectId;
        const pageUrl = this.route.firstChild.snapshot.queryParams.page;
        if (projectIdUrl !== null && projectIdUrl !== undefined) {
          console.log('idProject:' + projectIdUrl);
          this.projectIdSelected = projectIdUrl;
          if (pageUrl !== null && pageUrl !== undefined) {
            console.log('page:' + pageUrl);
            this.page = pageUrl;
            // khi này đã có đầy đủ page và projectId:
            this.getApiByProjectId(
              this.page,
              this.limit,
              this.projectIdSelected
            );
          } else {
            console.log('page không có');
            // không có page mà có id thì vẫn gọi lên nhưng cho page =1 rồi gọi
            this.page = 1;
            const myurl =
              'quan-ly-issues/issues-manager/list-by-project/' +
              this.projectIdSelected +
              '?page=' +
              this.page +
              '';
            console.log(myurl);
            this.router.navigateByUrl(myurl);
            this.getApiByProjectId(
              this.page,
              this.limit,
              this.projectIdSelected
            );
          }
        } else {
          console.log('idProject không có ');
        }
      } else {
        console.log('không có param của firstChild');
      }
    } else {
      console.log('không có firstChild');
    }
  }
  openModal(action: string, idIssue: number) {
   let issueSendToModal: IssueModel;
   console.log(action);
   console.log(idIssue);
   const modalRef = this.modalService.open(IssueModalComponent);
    // lấy luôn thông tin từ issue[] đẩy sang modal:
   this.issues.forEach((item: IssueModel) => {
      const indexIssue = this.issues.indexOf(item);
      if (item.id === idIssue) {
        issueSendToModal = this.issues[indexIssue];
      }
    });
   modalRef.componentInstance.id = idIssue; // truyền sang component con ngmodeltest
   modalRef.componentInstance.action = action; // truyền sang component con ngmodeltest
   modalRef.componentInstance.issues = issueSendToModal;
   }
   searchIssueByParams(){
    console.log(this.issueSearchDto.name);
    this.getApiByProjectIdAndParams(this.page, this.limit, this.projectIdSelected, this.issueSearchDto);
   }
   handlerPrioritySelected(event: any) {
    console.log(event.target.value);
    this.issueSearchDto.priority = event.target.value;
  }
  handlerLevelDonePercentSelected(event: any){
    console.log(event.target.value);
    this.issueSearchDto.donePercent = event.target.value;
  }
}
