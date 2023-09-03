import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-s-actions',
    templateUrl: './s-actions.component.html',
    styleUrls: ['./s-actions.component.scss'],
})
export class SActionsComponent {
    @Output() btnEdit = new EventEmitter<MouseEvent>();
    @Output() btnRemove = new EventEmitter<MouseEvent>();

    onEdit(evt: MouseEvent) {
        this.btnEdit.emit(evt);
    }

    onRemove(evt: MouseEvent) {
        this.btnRemove.emit(evt);
    }
}
