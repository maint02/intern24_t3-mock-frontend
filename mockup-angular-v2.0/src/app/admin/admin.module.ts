import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forChild([
            {path: '', pathMatch: 'full', redirectTo: 'cau-hinh-phe-duyet-cap-quan-ly'},
            {
                path: 'cau-hinh-cap-phe-duyet',
                loadChildren: () => import('./cau-hinh-cap-phe-duyet/cau-hinh-cap-phe-duyet.module').then(m => m.CauHinhCapPheDuyetModule),
                data: {
                    breadcrumbs: ['QuanTriHeThong', 'CauHinhCapPheDuyet']
                }
            },
            {
                path: 'cau-hinh-phe-duyet-cap-quan-ly',
                loadChildren: () => import('./cau-hinh-phe-duyet-cap-quan-ly/cau-hinh-phe-duyet-cap-quan-ly.module').then(m => m.CauHinhPheDuyetCapQuanLyModule),
                data: {
                    breadcrumbs: ['QuanTriHeThong', 'CauHinhPheDuyetCapQuanLy']
                }
            }
        ])
    ]
})
export class AdminModule {
}
