export class IssueHistoryModel {
    constructor() {}
    public  id: number ;
    public updateDate: Date;
    public comments: string;
    public issueId: number;
    public updatePersonId: number;
    public donePercentOld: number;
    public donePercentNew: number;
    public statusOld: number;
    public statusNew: number;
    public updatePersonName: string;
}
