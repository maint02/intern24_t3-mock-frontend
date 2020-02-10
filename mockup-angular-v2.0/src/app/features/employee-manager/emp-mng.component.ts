import {Component, OnInit} from '@angular/core';
import {Employee} from '../../shared/model/employee/employee.model';
import {ApiService} from '../../core/service/api.service';
import {SearchEmployeeResponseModel} from '../../shared/model/response/search-emp-response.model';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {RoleModel} from "../../shared/model/employee/role.model";

@Component({
    selector: 'emp-mng',
    templateUrl: './emp-mng.component.html',
    providers: [ApiService],
    styleUrls: ['./emp-mng.component.css']
})
export class EmpMngComponent implements OnInit {
    employee: Employee[] = [];
    searchResponseModel: SearchEmployeeResponseModel = new SearchEmployeeResponseModel();
    pageOptions: any = {
        page: 0,
        pageSize: 5,
        totalRows: 0,
        totalPages: 0
    };

    constructor(
        private apiService: ApiService,
        private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    ngOnInit(): void {
        this.searchResponseModel.page = 0;
        this.searchResponseModel.pageSize = 5;
        this.doSearch();
    }

    doSearch() {
        this.searchResponseModel.page = this.pageOptions.page;
        this.searchResponseModel.pageSize = this.pageOptions.pageSize;
        this.apiService.post('/getAll', this.searchResponseModel).subscribe(res => {
                console.log(res);
                if (res.code === '00') {
                    this.employee = res.datas;
                    this.pageOptions.totalPages = res.totalPages;
                    this.pageOptions.totalRows = res.totalRows;
                }
            }
        );
    }

    onPageChanged(event) {
        console.log('changedPage', this.searchResponseModel);
        this.pageOptions.page = event.page - 1;
        this.pageOptions.pageSize = event.itemsPerPage;
        this.doSearch();
    }


}
