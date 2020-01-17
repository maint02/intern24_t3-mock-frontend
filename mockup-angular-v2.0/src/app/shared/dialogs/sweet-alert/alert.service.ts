import Swal from "sweetalert2";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class AlertService {
    default_opts = {
        confirmButtonColor: '#ff4b46',
        confirmButtonText: 'OK',
        cancelButtonColor: '#fd3995',
        cancelButtonText: 'Cancel',
        message: null,
        title: null,
        icon: null
    };

    constructor() {

    }

    public fire(options?: any) {
        const opts = Object.assign(this.default_opts, options);
        return Swal.fire(opts.title, opts.message, opts.icon);
    }
}
