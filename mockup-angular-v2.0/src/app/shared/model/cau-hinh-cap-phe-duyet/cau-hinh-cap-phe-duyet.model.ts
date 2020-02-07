export interface ICauHinhCapPheDuyet {
    function_id?: string;
    function_name?: string;
    level?: string;
    description?: string;

}

export class CauHinhCapPheDuyet implements ICauHinhCapPheDuyet {
    constructor(
        public function_id?: string,
        public function_name?: string,
        public level?: string,
        public description?: string
    ) {
    }
}