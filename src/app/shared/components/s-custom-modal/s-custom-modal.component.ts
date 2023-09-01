import { Component, inject } from '@angular/core';

import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import { IModalConfig } from 'src/app/data/interfaces/IModalData.interface';

@Component({
    selector: 'app-s-custom-modal',
    templateUrl: './s-custom-modal.component.html',
    styleUrls: ['./s-custom-modal.component.scss'],
})
export class SCustomModalComponent {
    readonly #modal = inject(NzModalRef);
    readonly nzModalData: IModalConfig = inject(NZ_MODAL_DATA);

    closeModal(): void {
        this.#modal.destroy();
    }
}
