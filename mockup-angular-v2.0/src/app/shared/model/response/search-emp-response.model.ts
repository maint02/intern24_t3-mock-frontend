import {BaseModel} from '../base.model';

export class SearchEmployeeResponseModel extends BaseModel {
    id: bigint;
    username: string;
    email: string;
    fullName: string;
    createdDate: Date;
    lastAccess: Date;
    phoneNumber: string;
    userType: string;
    roleName: string;
    departmentName: string;
    positionName: string;
    teamName: string;
    isActived: boolean;
    isLeader: boolean;
    isManager: boolean;
}

