import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {environment} from '../../../environments/environment';
import { IssueModel } from 'src/app/features/quan-ly-issues/model/issue.model';
import { IssueUpdateModel } from 'src/app/features/quan-ly-issues/model/issueUpdate.model';

@Injectable({providedIn: 'root'})
export class IssueService {
    constructor(
        private http: HttpClient,
    ) { }

    getByProjectId( prId: number, page: number, limit: number): Observable<any> {
        return this.http.get(`${environment.api_url}/issue/get-by-project/${prId}?page=${page}&limit=${limit}`)
        .pipe(catchError(err => {
            return throwError(err);
        }));
    }

    searchByProjectIdAndParams(prId: number, page: number, limit: number, issueSearchDto: IssueModel): Observable<any> {
        return this.http.post(`${environment.api_url}/issue/get-by-project/${prId}/search?page=${page}&limit=${limit}`, issueSearchDto)
        .pipe(catchError(err => {
            return throwError(err);
        }));
    }
    deleteByIds(listIdChecked: number[]): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            body: listIdChecked
          };
        return this.http.delete(`${environment.api_url}/issue`, httpOptions)
        .pipe(catchError(err => {
            return throwError(err);
        }));
    }
    add(issue: IssueModel): Observable<any> {
        return this.http.post(`${environment.api_url}/issue`, issue)
        .pipe(catchError(err => {
            return throwError(err);
        }));
    }
    getById(id: number): Observable<any> {
        return this.http.get(`${environment.api_url}/issue/${id}`)
        .pipe(catchError(err => {
            return throwError(err);
        }));
    }
    update(issueUpdate: IssueUpdateModel): Observable<any> {
        return this.http.put(`${environment.api_url}/issue`, issueUpdate)
        .pipe(catchError(err => {
            return throwError(err);
        }));
    }
}
