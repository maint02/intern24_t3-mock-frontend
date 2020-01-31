import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {CauHinhCapPheDuyetComponent} from "./cau-hinh-cap-phe-duyet.component";
import {CapNhatCauHinhCapPheDuyetComponent} from "./cap-nhat-cau-hinh-cap-phe-duyet/cap-nhat-cau-hinh-cap-phe-duyet.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    declarations: [CauHinhCapPheDuyetComponent, CapNhatCauHinhCapPheDuyetComponent],
    entryComponents: [CapNhatCauHinhCapPheDuyetComponent],
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: '', component: CauHinhCapPheDuyetComponent},
        ]),
    ]
})
export class CauHinhCapPheDuyetModule {
}
