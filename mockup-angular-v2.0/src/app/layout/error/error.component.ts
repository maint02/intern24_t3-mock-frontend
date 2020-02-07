import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StateStorageService} from "../../core/auth/state-storage.service";

@Component({
    selector: 'jhi-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
    errorMessage: string;
    error403: boolean;
    error404: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private stateStorageService: StateStorageService
    ) {
    }

    ngOnInit() {
        this.route.data.subscribe(routeData => {
            if (routeData.error403) {
                this.error403 = routeData.error403;
            }
            if (routeData.error404) {
                this.error404 = routeData.error404;
            }
            if (routeData.errorMessage) {
                this.errorMessage = routeData.errorMessage;
            }
        });
    }

    back(e: MouseEvent) {
        e.preventDefault();
        const redirect = this.stateStorageService.getUrl();
        this.router.navigate(redirect ? redirect : ['']);
    }
}
