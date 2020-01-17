import {Injectable} from '@angular/core';
import {API_ENDPOINT_URL} from '../../app-config.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Account} from '../../shared/model/user/account.model';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CauHinhPheDuyenCapQuanLyService {

    constructor(
        private http: HttpClient
    ) {
    }

    public getModules(): Observable<any> {
        const body = {
            "header": {
                "reqType": "REQUEST",
                "trusted": "false"

            },
            "body": {
                "command": "GetModules",
            }
        };
        return this.http.post(`${API_ENDPOINT_URL}?path=GetModules`, body, {observe: 'response'});
    }

    public fetch(value: string, selectId: string): Observable<Account> {
        const body = {
            "header": {
                "reqType": "REQUEST",
                "trusted": "false"

            },
            "body": {
                "command": "GetEmployeeInfo",
                "userID": selectId === 'userId'? value: '',
                "email": selectId === 'email'? value: '',
                "emp_code": selectId === 'sbCode'? value: ''
            }
        };
        return this.http.post<HttpResponse<any>>(`${API_ENDPOINT_URL}?path=GetEmployeeInfo`, body, {observe: "response"}).pipe(
            map((response: HttpResponse<any>) => {
                let account: Account;
                account = Object.assign(new Account(), response.body.body.datares[0]);
                return account;
            })
        );
    }

    public getConfigApprovalOfManager(sbCode): Observable<any> {
        // sbCode = 'SB11781';
        let body = {
            'header': {
                'trusted': 'false'
            },
            'body': {
                'command': 'GetConfigApprovalOfManager',
                'sb_code': sbCode
            },
            'sign': 'XXXXXXXXXXXX'
        };
        return this.http.post(`${API_ENDPOINT_URL}?path=GetConfigApprovalOfManager`, body, {observe: 'response'});
    }

    public updateConfigApprovalOfManager(sbCode: string, approvalOfManager: any): Observable<any> {
        // sbCode = 'SB11781';
        let body = {
            'header': {
                'trusted': 'false'
            },
            'body': {
                'command': 'UpdateConfigApprovalOfManager',
                'isDisplayJobtitle': approvalOfManager.isDisplayJobtitle,
                'isDisplayFullName': approvalOfManager.isDisplayFullName,
                'isDisplayEmail': approvalOfManager.isDisplayEmail,
                'isDelegate': approvalOfManager.isDelegate,
                'datas': approvalOfManager.datas,
                'sb_code': sbCode
            },
            'sign': 'XXXXXXXXXXXX'
        };
        return this.http.post(`${API_ENDPOINT_URL}?path=UpdateConfigApprovalOfManager`, body, {observe: 'response'});
    }
}
