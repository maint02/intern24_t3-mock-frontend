import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'sb-validate-message',
    templateUrl: './sb-validate-message.component.html',
    styleUrls: ['./sb-validate-message.component.scss']
})
export class SbValidateMessageComponent implements OnInit {

    @Input() required_message: string = "This is a required field";
    @Input() pattern_message: string = "Incorrect format";

    constructor() {
    }

    ngOnInit() {
    }

}
