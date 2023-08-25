import {
    Injectable,
    TemplateRef,
    ViewContainerRef,
    inject,
} from '@angular/core';
import { ModalOptions, NzModalService } from 'ng-zorro-antd/modal';

import { SModalActionsComponent } from '../components/s-modal-actions/s-modal-actions.component';

import { IModalData } from 'src/app/data/interfaces/IModalData.interface';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private _nzModalService = inject(NzModalService);

    open(
        // template?: TemplateRef<any>,
        data?: IModalData,
        modalConfig?: ModalOptions
    ): void {
        this._nzModalService.create<SModalActionsComponent, IModalData>({
            ...modalConfig,
            nzData: data,
            nzContent: SModalActionsComponent,
            nzFooter: null,
        });
    }
}
