import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
@Injectable({providedIn: 'root'})
export class FileService {

    constructor(private  http: HttpClient) {
    }

    uploadAndGetFile(file: FormData): Observable<any> {
        return this.http.post(`${environment.api_url}/file/upload-and-get-file`, file, { responseType: 'blob' })
        .pipe(catchError(err => {
            return throwError(err);
        }));
    }
    getFileByName(name: string): Observable<any> {
        return this.http.get(`${environment.api_url}/file/get-file/${name}`, { responseType: 'blob' })
        .pipe(catchError(err => {
            return throwError(err);
        }));
    }
    uploadFile(fileData: FormData): Observable<any> {
        return this.http.post(`${environment.api_url}/file/upload`, fileData)
        .pipe(catchError(err => {
            return throwError(err);
        }));
    }
}
