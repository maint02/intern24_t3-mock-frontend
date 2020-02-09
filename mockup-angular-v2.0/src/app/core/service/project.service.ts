import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ProjectService {
    constructor(
        private http: HttpClient,
    ) { }

    getAll(): Observable<any> {
        return this.http.get(`${environment.api_url}/project/get-All`)
        .pipe(catchError(err => {
            return throwError(err);
        }));
    }
}
