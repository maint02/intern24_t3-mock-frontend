export interface ICauHinhPheDuyetCapQuanLy {
    function_id?: string;
    function_name?: string;
    fullname?: string;
    job_title?: string;
    sb_code?: string;
}

export class CauHinhPheDuyetCapQuanLy implements ICauHinhPheDuyetCapQuanLy {
    constructor(
        public function_id?: string,
        public function_name?: string,
        public fullname?: string,
        public job_title?: string,
        public sb_code?: string
    ) {
    }
}
