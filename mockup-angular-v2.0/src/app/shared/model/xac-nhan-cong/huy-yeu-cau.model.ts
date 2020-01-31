export interface IHuyYeuCau {
    command?: string;
    id?: string;
    status?: string;

}

export class HuyYeuCau implements IHuyYeuCau {
    constructor(
        public command?: string,
        public id?: string,
        public status?: string
    ) {
        this.command = "CancelVerifyTimekeeping";
    }
}