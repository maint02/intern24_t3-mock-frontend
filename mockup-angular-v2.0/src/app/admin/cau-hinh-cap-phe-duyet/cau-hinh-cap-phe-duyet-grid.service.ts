import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {API_ENDPOINT_URL} from "../../app-config.service";
import {process} from "@progress/kendo-data-query";

@Injectable({
    providedIn: 'root'
})
export class CauHinhCapPheDuyetGridService extends BehaviorSubject<any> {

    loading = false;
    public resourceUrl = API_ENDPOINT_URL + '?path=GetConfigApprovalLevel';

    constructor(
        private http: HttpClient
    ) {
        super(null);
    }

    public getDanhSachCauHinh(state: any): Observable<any> {
        this.loading = true;
        const body = {
            "header": {
                "trusted": "false"
            },
            "body": {
                "command": "GetConfigApprovalLevel",
                "func_id": "F_XNC"
            },
            "sign": "XXXXXXXXXXXX"
        };
        return this.http.post<any>(this.resourceUrl, body, {observe: "response"})
            .pipe(tap(res => {
                    this.loading = false;
                }, err => {
                    this.loading = false;
                }), map((response: HttpResponse<any>) => {
                const data = response.body.body.datares;
                return process(data, state);
                })
            );
    }

    public query(state: any): void {
        this.getDanhSachCauHinh(state).subscribe(data => super.next(data));
    }
}
