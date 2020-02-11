import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {environment} from '../../../environments/environment';
import { TeamProjectModel } from 'src/app/features/quan-ly-issues/model/TeamProject.model';

@Injectable({providedIn: 'root'})
export class TeamProjectService {
    constructor(
        private http: HttpClient,
    ) { }

    getAllIdMemberByProjectId(projectId: number): Observable<any> {
        return this.http.get(`${environment.api_url}/team-project/get-member-by-projectId/${projectId}`)
        .pipe(catchError(err => {
            return throwError(err);
        }));
    }
    saveTeamProject(teamProject: TeamProjectModel): Observable<any> {
        return this.http.post(`${environment.api_url}/team-project`, teamProject)
        .pipe(catchError(err => {
            return throwError(err);
        }));

    }
}
