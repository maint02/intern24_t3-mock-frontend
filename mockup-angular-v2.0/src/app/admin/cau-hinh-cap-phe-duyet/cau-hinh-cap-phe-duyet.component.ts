import {Component, OnInit, ViewChild} from '@angular/core';
import {DataStateChangeEvent, GridDataResult} from "@progress/kendo-angular-grid";
import {process, State} from "@progress/kendo-data-query";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastrService} from "ngx-toastr";
import * as moment from 'moment';
import {AlertService} from "../../shared/dialogs/sweet-alert/alert.service";
import {CapNhatCauHinhCapPheDuyetComponent} from "./cap-nhat-cau-hinh-cap-phe-duyet/cap-nhat-cau-hinh-cap-phe-duyet.component";
import {CauHinhCapPheDuyetService} from "./cau-hinh-cap-phe-duyet.service";
import {PAGEABLE_CONFIG} from "../../core/config/pageable.config";
import {TooltipDirective} from "@progress/kendo-angular-tooltip";

@Component({
    selector: 'smart-cau-hinh-cap-phe-duyet',
    templateUrl: './cau-hinh-cap-phe-duyet.component.html',
    styleUrls: ['./cau-hinh-cap-phe-duyet.component.scss']
})
export class CauHinhCapPheDuyetComponent implements OnInit {

    moment = moment;
    // grid data
    public gridView: GridDataResult;
    pageableConfig = PAGEABLE_CONFIG;
    state: State = {
        skip: 0,
        take: 10,
        sort: [{
            field: 'date',
            dir: 'asc'
        }]
    };
    items: any[];
    selectedItems = [];
    // end grid data

    // tooltip
    @ViewChild(TooltipDirective, {static: true})
    public tooltipDir: TooltipDirective;

    //end tooltip

    constructor(
        public modal: NgbModal,
        public toastr: ToastrService,
        public alertService: AlertService,
        public cauHinhCapPheDuyetService: CauHinhCapPheDuyetService
    ) {
    }

    ngOnInit() {
        this.doSearch();
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.state = state;
        this.loadItems();
    }

    private doSearch() {
        this.cauHinhCapPheDuyetService.getDanhSachCauHinh().subscribe(
            res => {
                this.items = res;
                this.loadItems();
            }, error => {
                console.error(error);
            }
        );
    }

    private loadItems(): void {
        this.gridView = process(this.items, this.state);
    }

    public search() {
        console.log(this.state.sort);
    }

    public getStatus(status): string {
        let html_output = "";
        if (status === 1) {
            html_output = '<span class="text-success">Đủ công<span>';
        } else {
            html_output = '<span class="text-danger">Thiếu công<span>'
        }
        return html_output;
    }

    public update(event: MouseEvent, dataItem) {
        event.preventDefault();
        const modalRef = this.modal.open(CapNhatCauHinhCapPheDuyetComponent, {size: "lg"});
        modalRef.componentInstance.entity = dataItem;
        modalRef.result.then(
            result => {
                this.doSearch();
            }, reason => {
                console.info('close reason: ' + reason);
            });
    }

    public delete(event: MouseEvent, dataItem) {
        event.preventDefault();
        console.log(dataItem);
        this.alertService.fire({
            showCancelButton: true
        }).then((result) => {
            console.log(result);
            if (result.value) {
                console.log('Confirm')
            } else {
                console.log("Cancel")
            }
        });
    }

    public formatDescriptionHTML(desc: string) {
        return desc.replace(/\\r\\n/gi, "<br/>");
    }

    public showTooltip(e: MouseEvent): void {
        const element = e.target as HTMLElement;
        if (
            (element.nodeName === 'TD' || element.nodeName === 'TH' || element.nodeName === 'A')
            && element.offsetWidth < element.scrollWidth
            && element.innerText
        ) {
            this.tooltipDir.toggle(element);
        } else {
            this.tooltipDir.hide();
        }
    }
}