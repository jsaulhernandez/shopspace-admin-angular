import { Injectable, TemplateRef, inject } from '@angular/core';
import { ModalOptions, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

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
    nzModalRef!: NzModalRef;

    open(
        template: TemplateRef<any>,
        data?: IModalData,
        modalConfig?: ModalOptions
    ) {
        this.nzModalRef = this.nzModalService$.create<
            SCustomModalComponent,
            IModalData
        >({
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

    close() {
        this.nzModalRef.destroy();
    }
}
