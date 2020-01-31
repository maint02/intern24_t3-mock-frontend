import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CauHinhPheDuyetCapQuanLyComponent} from './cau-hinh-phe-duyet-cap-quan-ly.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    declarations: [CauHinhPheDuyetCapQuanLyComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: CauHinhPheDuyetCapQuanLyComponent},
        ]),
    ]
})
export class CauHinhPheDuyetCapQuanLyModule {
}
