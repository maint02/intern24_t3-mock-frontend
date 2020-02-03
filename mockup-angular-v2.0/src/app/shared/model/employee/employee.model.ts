export class Employee {
    constructor(
        public id?: bigint,
        public username?: string,
        private password?: string,
        public fullName?: string,
        public imageUrl?: string,
        public lastAccess?: any,
        public createdDate?: any,
        public phoneNumber?: string,
        public userType?: string,
        public address?: string,
        public university?: string,
        public graduatedYear?: bigint,
        public isLeader?: boolean,
        public isManager?: boolean,
        public isActived?: boolean,
        public birthday?: any,
        public skypeAccount?: string,
        public email?: string,
        public isApproved?: boolean,
        public roleId?: number,
        public roleName?: string,
        public departmentId?: number,
        public departmentName?: string,
        public positionId?: number,
        public positionName?: string,
        public teamId?: number,
        public teamName?: string,

        public rememberMe?: boolean,
        public authorities?: string

    ) {
    }
}