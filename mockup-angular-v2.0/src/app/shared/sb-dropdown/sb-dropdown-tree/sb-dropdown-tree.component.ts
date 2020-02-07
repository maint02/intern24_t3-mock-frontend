import {Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {of} from "rxjs";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const is = (fileName: string, ext: string) => new RegExp(`.${ext}\$`).test(fileName);

@Component({
    selector: 'smart-dropdown-tree',
    templateUrl: './sb-dropdown-tree.component.html',
    styleUrls: ['./sb-dropdown-tree.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SbDropdownTreeComponent),
            multi: true
        }
    ]
})
export class SbDropdownTreeComponent implements ControlValueAccessor, OnInit, OnChanges {

    @Input()
    items: any[];
    @Output()
    selectChange = new EventEmitter();

    show = false;

    parsedData: any[];
    selectedKeys = [];
    selectedItem: any = null;

    onChange: (item: any) => void;
    onTouch: (item: any) => void;

    firstTime = true;

    constructor() {
    }

    ngOnInit() {
        if (this.items) {
            this.addExpandState(this.items);
            this.parsedData = this.items;
        }
    }

    onClickOut() {
        this.show = false;
        this.parsedData = this.items;
    }

    // controlValueAccessor
    registerOnChange(fn: (item: any) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    writeValue(obj: any): void {
        // set selected item on the beginning
        if (this.firstTime && obj && obj.text) {
            this.selectedItem = obj;
            this.selectedKeys.push(obj.text);
            this.firstTime = false;
        }
    }

    // end controlValueAccessor

    public iconClass({text, items}: any): any {
        return {
            'k-i-folder': true,
            'k-icon': true
        };
    }

    public clearSelectedKeys() {
        this.selectedKeys = [];
        this.selectedItem = null;
        this.selectChange.emit(null);
        this.onChange(this.selectedItem);

    }

    public onSelectionChange(event): void {
        this.show = false;
        this.selectedItem = event.dataItem;
        this.selectChange.emit(event.dataItem);
        this.onChange(this.selectedItem);
    }

    public isExpanded(dataItem: any, index: string) {
        return dataItem.expanded;
    };

    public handleCollapse(node) {
        this.collapseNode(node.dataItem);
    }

    public handleExpand(node) {
        node.dataItem['expanded'] = true;
    }

    public hasChildren = (item: any) => item.items && item.items.length > 0;

    public fetchChildren = (item: any) => of(item.items);

    public search(items: any[], term: string): any[] {
        return items.reduce((acc, item) => {
            if (this.contains(item.text, term)) {
                acc.push(item);
            } else if (item.items && item.items.length > 0) {
                let newItems = this.search(item.items, term);

                if (newItems.length > 0) {
                    acc.push({text: item.text, items: newItems, expanded: true});
                }
            }
            return acc;
        }, []);
    }

    public contains(text: string, term: string): boolean {
        return text.toLowerCase().indexOf(term.toLowerCase()) >= 0;
    }

    public onkeyup(value: string): void {
        this.parsedData = this.search(this.items, value);
    }

    // kendo popup
    public onToggle(): void {
        this.show = !this.show;
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }

    // end kendo treeview

    // kendo treeview
    private collapseNode(item) {
        item['expanded'] = false;
        if (item.items && item.items.length) {
            item.items.forEach(i => {
                this.collapseNode(i);
            });
        }
    }

    private addExpandState(items: any[]) {
        items.forEach(item => {
            item['expanded'] = true;
            if (item.items && items.length) {
                this.addExpandState(item.items);
            }
        });
    }

    // end kendo popup

}
