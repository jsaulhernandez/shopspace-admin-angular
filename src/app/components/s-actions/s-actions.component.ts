import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-s-actions',
    templateUrl: './s-actions.component.html',
    styleUrls: ['./s-actions.component.scss'],
})
export class SActionsComponent {
    @Output() btnEdit = new EventEmitter();
    @Output() btnRemove = new EventEmitter();

    onEdit() {
        this.btnEdit.emit();
    }

    onRemove() {
        this.btnRemove.emit();
    }
}
