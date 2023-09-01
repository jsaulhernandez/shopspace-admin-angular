import { Injectable, TemplateRef, inject } from '@angular/core';
import { ModalOptions, NzModalService } from 'ng-zorro-antd/modal';

import { SCustomModalComponent } from '../components/s-custom-modal/s-custom-modal.component';

import {
    IModalConfig,
    IModalData,
} from 'src/app/data/interfaces/IModalData.interface';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    private nzModalService$ = inject(NzModalService);

    open(
        template: TemplateRef<any>,
        data?: IModalData,
        modalConfig?: ModalOptions
    ) {
        this.nzModalService$.create<SCustomModalComponent, IModalData>({
            ...modalConfig,
            nzData: <IModalConfig>{
                ...data,
                modalContent: template,
            },
            nzContent: SCustomModalComponent,
            nzFooter: null,
            nzMaskClosable: true,
            nzClosable: true,
        });
    }
}
