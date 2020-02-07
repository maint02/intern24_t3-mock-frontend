export class IssueModel {
    constructor() {}
    public  id: number ;

    public  startDate?: Date;

    public  dueDate?: Date;

    public  name?: string;

    public  donePercent?: number;

    public  priority?: string;

    public  reason?: string;

    public  description?: string;

    public  type?: string;

    public  projectId?: number;

    public  statusId?: number;

    public  employeeReportedId?: number;
    public statusName?: string;
    public isSelected: boolean = false;
}
