export interface IYeuCauXacNhan {
    command?: string;
    emp_code?: string;
    verify_date?: string;
    time_in?: string;
    time_out?: string;
    timein_verify?: string;
    timeout_verify?: string;
    reason?: string;
    reason_other?: string;
    status?: number;
}

export class YeuCauXacNhan implements IYeuCauXacNhan {
    constructor(
        public command?: string,
        public emp_code?: string,
        public verify_date?: string,
        public time_in?: string,
        public time_out?: string,
        public timein_verify?: string,
        public timeout_verify?: string,
        public reason?: string,
        public reason_other?: string,
        public status?: number
    ) {
        this.command = "RequestVerifyTimekeeping";
    }
}