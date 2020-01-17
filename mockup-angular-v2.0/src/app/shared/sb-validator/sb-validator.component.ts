import {
    AfterViewInit,
    Component,
    ContentChild,
    EmbeddedViewRef,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SbValidateDirective} from "./sb-validate.directive";
import {SbValidateMessageComponent} from "./sb-validate-message/sb-validate-message.component";

@Component({
    selector: 'sb-validator',
    templateUrl: './sb-validator.component.html',
    styleUrls: ['./sb-validator.component.scss'],
})
export class SbValidatorComponent implements OnInit, AfterViewInit {

    @Input('formInput') formControl: FormControl;

    @Input('touched') set touched(value: boolean) {
        if (value) {
            this._touched = value;
            this.validateForm();
        }
    };

    _touched: boolean;

    @ViewChild(SbValidateDirective, {static: true}) sbValidateDirective: SbValidateDirective;
    @ViewChild('defaultTemplate', {static: true}) defaultTemplate: TemplateRef<any>;
    @ContentChild('template', {static: true}) template: TemplateRef<any>;
    @ContentChild(SbValidateMessageComponent, {static: true}) sbValidateMessageComponent: SbValidateMessageComponent;
    viewContainerRef: ViewContainerRef;
    embeddedViewRef: EmbeddedViewRef<any>;
    messages: SbValidateMessageComponent;
    message: string;

    constructor() {
    }

    ngOnInit() {
        this.formControl.valueChanges.subscribe(data => {
            this.validateForm();
        });
        this.formControl.statusChanges.subscribe(status => {
            this.validateForm();
        });
    }

    ngAfterViewInit(): void {
        this.viewContainerRef = this.sbValidateDirective.viewContainerRef;
        if (this.sbValidateMessageComponent) {
            this.messages = this.sbValidateMessageComponent;
        } else {
            this.messages = new SbValidateMessageComponent();
        }
    }

    validateForm() {
        if (this.formControl.invalid && this._touched) {
            this.viewContainerRef.clear();

            if (this.formControl.errors.required) {
                this.message = this.messages.required_message;
            }
            if (this.formControl.errors.pattern) {
                this.message = this.messages.pattern_message;
            }
            this.embeddedViewRef = this.viewContainerRef.createEmbeddedView(this.template ? this.template : this.defaultTemplate, {
                message: this.message
            });
        } else {
            if (this.viewContainerRef) {
                this.viewContainerRef.clear();
            }
        }
    }
}
