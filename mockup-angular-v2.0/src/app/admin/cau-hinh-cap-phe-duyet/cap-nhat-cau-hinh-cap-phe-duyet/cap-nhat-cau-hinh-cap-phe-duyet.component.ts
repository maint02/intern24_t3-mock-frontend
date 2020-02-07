import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder} from "@angular/forms";
import {
    CauHinhCapPheDuyet,
    ICauHinhCapPheDuyet
} from "../../../shared/model/cau-hinh-cap-phe-duyet/cau-hinh-cap-phe-duyet.model";
import {CauHinhCapPheDuyetService} from "../cau-hinh-cap-phe-duyet.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'smart-cap-nhat-cau-hinh-cap-phe-duyet',
    templateUrl: './cap-nhat-cau-hinh-cap-phe-duyet.component.html',
    styleUrls: ['./cap-nhat-cau-hinh-cap-phe-duyet.component.scss']
})
export class CapNhatCauHinhCapPheDuyetComponent implements OnInit {

    editForm = this.fb.group({
        function_id: [],
        function_name: [],
        level: [],
        description: [],
    });

    entity: ICauHinhCapPheDuyet;

    constructor(
        public activeModal: NgbActiveModal,
        public toastr: ToastrService,
        public fb: FormBuilder,
        public cauHinhCapPheDuyetService: CauHinhCapPheDuyetService
    ) {
    }

    ngOnInit() {
        if (this.entity) {
            this.updateForm();
        }
    }

    public cancel() {
        this.activeModal.dismiss('cancel');
    }

    updateForm() {
        this.editForm.patchValue({
            function_id: this.entity.function_id,
            function_name: this.entity.function_name,
            level: this.entity.level,
            description: this.formatDescription(this.entity.description),
        });
    }

    getFormValues() {
        const entity = {
            ...new CauHinhCapPheDuyet(),
            function_id: this.editForm.get(['function_id']).value,
            function_name: this.editForm.get(['function_name']).value,
            level: this.editForm.get(['level']).value,
            description: this.editForm.get(['description']).value,
        }
        return entity;
    }

    public onSubmit() {
        const entity = this.getFormValues();
        this.cauHinhCapPheDuyetService.updateCauHinhCapPheDuyet(entity).subscribe(
            res => {
                this.toastr.success("Cập nhật thành công");
                this.activeModal.close('success');
            }, err => {
                this.toastr.error("Có lỗi xảy ra!");
                this.activeModal.dismiss('update fail');
            }
        );
    }

    public formatDescription(desc: string) {
        return desc.replace(/\\r\\n /gi, "\n");
    }
}
