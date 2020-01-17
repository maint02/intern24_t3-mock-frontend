import {RoleModel} from '../role.model';
import {PositionModel} from './position.model';

export class Account {
    constructor(
        public id: number,
        private username: string,
        private password: string,
        public fullName: string,
        public imageUrl?: string,
        public createdDate?: string,
        public lastAccess?: string,
        public email: string,
        public isApproved?: boolean,
        public skypeAccount?: string,
        public userType?: string,
        public address?: string,
        public university?: string,
        public graduatedYear?: string,
        public role: RoleModel,
        public rememberMe?: boolean,
        public birthday: string,
        public authorities: string[],
        public langKey?: string,
        // public isLeader?: boolean,
        // public isManager?: boolean,
        // public isActived?: boolean,
        // public position: PositionModel,



        // public firstName?: string,
        // public lastName?: string,
        // public login?: string,
        // public imageUrl?: string,
        // public emp_code?: string,
        // public emp_name?: string,
        // public ipphone?: string,
        // public isDelegate?: string,
        // public job_title?: string,
        // public job_type?: string,
        // public org_name?: string,
        // public type?: string,
        // public flag?: string
    ) {
    }
}

