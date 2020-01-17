import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export let API_ENDPOINT_URL;

@Injectable({
    providedIn: 'root'
})
export class AppConfigService {

    private appConfig;

    constructor(
        private http: HttpClient
    ) {
    }

    public loadAppConfig(): Promise<any> {
        return this.http.get('/config/app.config.local.json').toPromise().then(
            data => {
                this.appConfig = data;
                API_ENDPOINT_URL = this.appConfig.API_ENDPOINT;
            }
        );
    }

    public getAPIEndPoint(): string {
        return this.appConfig ? this.appConfig.API_ENDPOINT : null;
    }
}
