import {Component, OnInit, Renderer2} from '@angular/core';
import {DataStateChangeEvent, GridDataResult} from '@progress/kendo-angular-grid';
import {process, State} from '@progress/kendo-data-query';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {AlertService} from 'src/app/shared/dialogs/sweet-alert/alert.service';
import * as moment from 'moment';
import {FormBuilder, Validators} from '@angular/forms';
import {CauHinhPheDuyenCapQuanLyService} from './cau-hinh-phe-duyen-cap-quan-ly.service';
import {CauHinhPheDuyetCapQuanLy} from '../../shared/model/cau-hinh-cap-phe-duyet/cau-hinh-phe-duyet-cap-quan-ly.model';
import {AccountService} from '../../core/auth/account.service';
import {Account} from '../../shared/model/user/account.model';

@Component({
    selector: 'smart-cau-hinh-phe-duyet-cap-quan-ly',
    templateUrl: './cau-hinh-phe-duyet-cap-quan-ly.component.html',
    styleUrls: ['./cau-hinh-phe-duyet-cap-quan-ly.component.scss']
})
export class CauHinhPheDuyetCapQuanLyComponent implements OnInit {

    moment = moment;
    public gridView: GridDataResult;
    stateGrid: State = {
        skip: 0,
        take: 10,
        sort: []
    };

    pageableConfig = {
        buttonCount: 5,
        info: true,
        type: 'numeric',
        pageSizes: true,
        previousNext: true
    };

    addForm = this.formBuilder.group({
        checkboxJobTitle: null,
        checkboxName: null,
        checkboxEmail: null,
        checkboxAssign: null,
        selectID: 'sbCode',
        inputID: ['', Validators.required],
        inputName: ['', Validators.required],
        inputJobTitle: ['', Validators.required],
        selectAssign: ['']
    });

    items: any [];
    tempApprovals: any[];
    selectedItems = [];
    employee: Account;
    sbCode;
    isDisplayJobtitle = true;
    isDisplayFullName = false;
    isDisplayEmail = false;
    isDelegate = true;
    modules = [];
    typesSearch = [];
    disabledAdd = true;
    emailIsInvalid = false;
    approvalOfManager = {
        datas: [],
        isDisplayJobtitle: '',
        isDisplayFullName: '',
        isDisplayEmail: '',
        isDelegate: ''
    };
    lengthInputId = 10;

    constructor(
        public modal: NgbModal,
        public toastr: ToastrService,
        public alertService: AlertService,
        public formBuilder: FormBuilder,
        private cauHinhPheDuyenCapQuanLyService: CauHinhPheDuyenCapQuanLyService,
        private renderer: Renderer2,
        private accountService: AccountService
    ) {
    }

    ngOnInit() {
        this.getAccountInfo();
        this.buildCombobox();
        this.getConfigApprovalOfManager(this.sbCode);
        this.setFocusFirst();
    }

    public dataStateChange(state: DataStateChangeEvent): void {
        this.stateGrid = state;
        this.loadItems();
    }

    private loadItems(): void {
        this.gridView = process(this.items, this.stateGrid);
    }

    private buildCombobox(): void {
        this.cauHinhPheDuyenCapQuanLyService.getModules().subscribe(data => {
            if (data) {
                this.modules = data.body.body.datares;
                this.modules.unshift({code: '', name: 'Tất cả'});
            }
        });
        this.typesSearch = [
            {code: 'sbCode', name: 'Mã SB'},
            {code: 'email', name: 'Email'},
            {code: 'userId', name: 'UserId'}
        ];
    }

    private buildForm(data: any) {
        if (data !== null) {
            if (data.isDisplayFullName !== '') {
                this.isDisplayFullName = this.getValueCheckbox(data.isDisplayFullName);
            }
            if (data.isDisplayJobtitle !== '') {
                this.isDisplayJobtitle = this.getValueCheckbox(data.isDisplayJobtitle);
            }
            if (data.isDisplayEmail !== '') {
                this.isDisplayEmail = this.getValueCheckbox(data.isDisplayEmail);
            }
            if (data.isDelegate !== '') {
                this.isDelegate = this.getValueCheckbox(data.isDelegate);
            }
        }
        this.checkboxName.setValue(this.isDisplayFullName);
        this.checkboxJobTitle.setValue(this.isDisplayJobtitle);
        this.checkboxEmail.setValue(this.isDisplayEmail);
        this.checkboxAssign.setValue(this.isDelegate);
    }

    public fetchEmp(event: KeyboardEvent) {
        if (event.code === 'Enter' || event.code === 'Space' || event.code === 'Tab') {
            this.employee = new Account();
            let value = this.inputID.value.toString().trim();
            this.addForm.get('inputName').reset();
            this.addForm.get('inputJobTitle').reset();
            if (value !== '' && this.validateEmail()) {
                this.cauHinhPheDuyenCapQuanLyService.fetch(value, this.selectID.value).subscribe(data => {
                    if (!data.flag) {
                        this.toastr.warning('Nhân viên không tồn tại');
                    } else if (data.flag === 'enable') {
                        this.employee = data;
                        this.addForm.get('inputName').setValue(this.employee.emp_name);
                        this.addForm.get('inputJobTitle').setValue(this.employee.job_title);
                        this.disabledAdd = false;
                        this.setFocusName();
                    } else {
                        this.toastr.error('Nhân viên đang trong trạng thái không hoạt động');
                    }
                }, error => {
                    this.toastr.error('Lỗi trong quá trình xử lý. Vui lòng thử lại sau.');
                });
            } else {
                this.disabledAdd = true;
            }
        }
    }

    public fetchEmpBlur() {
        this.employee = new Account();
        let value = this.inputID.value.toString().trim();
        this.addForm.get('inputName').reset();
        this.addForm.get('inputJobTitle').reset();
        if (value !== '' && this.validateEmail()) {
            this.cauHinhPheDuyenCapQuanLyService.fetch(value, this.selectID.value).subscribe(data => {
                if (!data.flag) {
                    this.toastr.warning('Nhân viên không tồn tại');
                } else if (data.flag === 'enable') {
                    this.employee = data;
                    this.addForm.get('inputName').setValue(this.employee.emp_name);
                    this.addForm.get('inputJobTitle').setValue(this.employee.job_title);
                    this.disabledAdd = false;
                    this.setFocusName();
                } else {
                    this.toastr.error('Nhân viên đang trong trạng thái không hoạt động');
                }
            }, error => {
                this.toastr.error('Lỗi trong quá trình xử lý. Vui lòng thử lại sau.');
            });
        } else {
            this.disabledAdd = true;
        }
    }

    public add(): void {
        let approvals = [];
        if (this.validateForm()) {
            let module = this.selectAssign.value;
            if (module == '') {
                this.modules.forEach(item => {
                    let approval = this.convertToApproval(item);
                    approvals.push(approval);
                });
                this.addApproval(approvals);
            } else {
                let item = this.modules.filter(item => module === item.code)[0];
                let approval = this.convertToApproval(item);
                approvals.push(approval);
                this.addApproval(approvals);
            }
        }
    }

    private addApproval(approvals: CauHinhPheDuyetCapQuanLy[]): void {
        approvals.forEach(item => {
            if (!this.isExisted(item)) {
                this.items.unshift(item);
                this.loadItems();
                this.toastr.success(`Thông tin dữ liệu ${item.fullname} - ${item.function_name} đã được thêm mới thành công`);
            } else {
                this.toastr.warning(`Thông tin dữ liệu ${item.fullname} - ${item.function_name} đã tồn tại`);
            }
        });
    }

    private convertToApproval(module: any): CauHinhPheDuyetCapQuanLy {
        let approval = new CauHinhPheDuyetCapQuanLy();
        approval.sb_code = this.employee.emp_code;
        approval.fullname = this.employee.emp_name;
        approval.job_title = this.employee.job_title;
        approval.function_name = module.name;
        approval.function_id = module.code;
        return approval;
    }

    private validateForm(): boolean {
        if (!this.employee || this.employee.emp_name === '') {
            return false;
        }
        return true;
    }

    private validateEmail(): boolean {
        if (this.selectID.value !== 'email') {
            this.emailIsInvalid = false;
            return true;
        }
        if (this.inputID.valid) {
            this.emailIsInvalid = false;
            return true;
        } else {
            this.emailIsInvalid = true;
            return false;
        }
    }

    private isExisted(employee): boolean {
        let result = false;
        if (!this.items) {
            this.items = [];
            return result;
        } else {
            this.items.forEach(item => {
                if (item.sb_code === employee.sb_code && item.function_id === employee.function_id) {
                    result = true;
                }
            });
        }
        return result;
    }

    public delete(event: MouseEvent, dataItem) {
        event.preventDefault();
        let index = this.items.indexOf(dataItem);
        this.alertService.fire({
            showCancelButton: true,
            title: 'Bạn có muốn xóa yêu cầu ?',
            text: 'Bạn không thể khôi phục lại trạng thái trước đó !',
        }).then((result) => {
            if (result.value) {
                this.items.splice(index, 1);
                this.loadItems();
            }
        });
    }

    public update() {
        this.approvalOfManager.datas = this.items;
        this.approvalOfManager.isDisplayJobtitle = this.checkboxJobTitle.value == true ? 'Y' : 'N';
        this.approvalOfManager.isDisplayFullName = this.checkboxName.value == true ? 'Y' : 'N';
        this.approvalOfManager.isDisplayEmail = this.checkboxEmail.value == true ? 'Y' : 'N';
        this.approvalOfManager.isDelegate = this.checkboxAssign.value == true ? 'Y' : 'N';
        this.cauHinhPheDuyenCapQuanLyService.updateConfigApprovalOfManager(this.sbCode, this.approvalOfManager).subscribe(data => {
            if (data.body.header.res_code === '000') {
                this.toastr.success('Cập nhật cấu hình phê duyệt của cấp quản lý thành công');
                this.getConfigApprovalOfManager(this.sbCode);
            }
        }, error => {
            this.toastr.error('Lỗi trong quá trình xử lý. Vui lòng thử lại sau');
        });
    }

    public getConfigApprovalOfManager(sbCode: string) {
        this.items = [];
        this.cauHinhPheDuyenCapQuanLyService.getConfigApprovalOfManager(sbCode).subscribe(data => {
            if (data.body.body.datares) {
                this.items = data.body.body.datares.datas;
                this.tempApprovals = data.body.body.datares.datas;
                let approvalOfManager = data.body.body.datares;
                this.loadItems();
                this.buildForm(approvalOfManager);
            } else {
                this.buildForm(null);
            }
        }, error => {
            this.toastr.error('Lỗi trong quá trình xử lý. Vui lòng thử lại sau.');
        });
    }

    private setFocusFirst(): void {
        setTimeout(() => {
            this.renderer.selectRootElement('#inputMaSB').focus();
        }, 500);
    }

    private setFocusName(): void {
        this.renderer.selectRootElement('#inputName').focus();
    }

    private getAccountInfo() {
        this.accountService.identity().subscribe(acc => {
            if (acc) {
                this.sbCode = acc.emp_code;
            }
        });
    }

    private getValueCheckbox(value: string): boolean {
        return value.toLowerCase() === 'y' ? true : false;
    }

    public changeSelectId() {
        let selectId = this.selectID.value;
        if (selectId === 'email') {
            this.lengthInputId = 320;
            this.inputID.setValidators([Validators.required, Validators.email]);
        } else {
            this.lengthInputId = 10;
            this.inputID.setValidators(Validators.required);
        }
    }

    get selectID() {
        return this.addForm.get('selectID');
    }

    get inputID() {
        return this.addForm.get('inputID');
    }

    get selectAssign() {
        return this.addForm.get('selectAssign');
    }

    get checkboxAssign() {
        return this.addForm.get('checkboxAssign');
    }

    get checkboxJobTitle() {
        return this.addForm.get('checkboxJobTitle');
    }

    get checkboxName() {
        return this.addForm.get('checkboxName');
    }

    get checkboxEmail() {
        return this.addForm.get('checkboxEmail');
    }
}
