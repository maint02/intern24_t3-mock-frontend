export class Account {
    constructor(
        public activated?: boolean,
        public authorities?: string[],
        public email?: string,
        public firstName?: string,
        public langKey?: string,
        public lastName?: string,
        public login?: string,
        public imageUrl?: string,
        public emp_code?: string,
        public emp_name?: string,
        public ipphone?: string,
        public isDelegate?: string,
        public job_title?: string,
        public job_type?: string,
        public org_name?: string,
        public type?: string,
        public flag?: string
    ) {
    }
}
