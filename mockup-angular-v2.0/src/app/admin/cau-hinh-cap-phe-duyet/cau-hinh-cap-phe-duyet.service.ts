import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BaseService} from "../../core/service/base-service";
import {catchError, map, tap} from "rxjs/operators";
import {ICauHinhCapPheDuyet} from "../../shared/model/cau-hinh-cap-phe-duyet/cau-hinh-cap-phe-duyet.model";
import {API_ENDPOINT_URL} from "../../app-config.service";

@Injectable({
    providedIn: 'root'
})
export class CauHinhCapPheDuyetService extends BaseService {

    loading = false;
    public resourceUrl = API_ENDPOINT_URL + '?path=GetConfigApprovalLevel';

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    public getDanhSachCauHinh(): Observable<any> {
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
            .pipe(map(res => {
                    return res.body.body.datares;
                }), tap(() => {
                    this.loading = false;
                }, () => {
                    this.loading = false;
                }),
                catchError(this.handleError)
            );
        ;
    }

    public updateCauHinhCapPheDuyet(config: ICauHinhCapPheDuyet): Observable<any> {
        const body = {
            "header": {
                "trusted": "false",
            },
            "body": {
                "command": "UpdateConfigApprovalLevel",
                "function_id": config.function_id,
                "level": config.level
            },
            "sign": "XXXXXXXXXXXX"
        };
        return this.http.post(API_ENDPOINT_URL + '?path=UpdateConfigApprovalLevel', body, {observe: "response"})
            .pipe(
                catchError(this.handleError)
            );
        ;
    }
}
