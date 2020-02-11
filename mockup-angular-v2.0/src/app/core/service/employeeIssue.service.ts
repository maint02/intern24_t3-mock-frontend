import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {environment} from '../../../environments/environment';
import { EmployeeIssueModel } from 'src/app/features/quan-ly-issues/model/employeeIssue.model';

@Injectable({providedIn: 'root'})
export class EmployeeIssueService {
    constructor(private  http: HttpClient) {
    }

    save(empIssue: EmployeeIssueModel): Observable<any> {
        return this.http.post(`${environment.api_url}/employee-issue`, empIssue)
        .pipe(catchError(err => {
            return throwError(err);
        }));
    }  
}
