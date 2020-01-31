export interface IQuanLyGia {
    shiftType?: string;
    shiftName?: string;
    shiftCode?: string;
    shiftStartTime?: string;
    shiftEndTime?: string;
    relaxStartTime?: string;
    relaxEndTime?: string;
    timeIsLate?: number;
    timeIsSoon?: number;
    timePartBeforeShift?: number;
    timePartAfterShift?: number;
    miniumTimeContinous?: number;
}

export class QuanLyGia implements IQuanLyGia {
    constructor(
        public shiftType?: string,
        public shiftName?: string,
        public shiftCode?: string,
        public shiftStartTime?: string,
        public shiftEndTime?: string,
        public relaxStartTime?: string,
        public relaxEndTime?: string,
        public timeIsLate?: number,
        public timeIsSoon?: number,
        public timePartBeforeShift?: number,
        public timePartAfterShift?: number,
        public miniumTimeContinous?: number,
    ) {
    }
}
