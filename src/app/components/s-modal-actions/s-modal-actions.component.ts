import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ModalActionsType, TypeButton } from 'src/app/constants/constants';

@Component({
    selector: 'app-s-modal-actions',
    templateUrl: './s-modal-actions.component.html',
    styleUrls: ['./s-modal-actions.component.scss'],
})
export class SModalActionsComponent {
    @Input() type: ModalActionsType = 'confirm';
    @Input() title: string = '';
    @Input() open: boolean = false;
    @Output() onClose = new EventEmitter();
    @Output() onConfirm = new EventEmitter();
    @Input() loading: boolean = false;
    @Input() isDanger: boolean = false;
    @Input() textConfirm?: string;
}
