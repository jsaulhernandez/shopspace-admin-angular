import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CustomHeader } from 'src/app/core/utils/components.util';

@Component({
    selector: 'app-s-table',
    templateUrl: './s-table.component.html',
    styleUrls: ['./s-table.component.scss'],
})
export class STableComponent<T extends Object> {
    @Input() header: CustomHeader[] = [];
    @Input() data: T[] = [];
    @Input() isLoading: boolean | null = false;
    @Input() index: number = 0;
    @Input() total: number = 0;
    @Input() size: number = 0;
    @Output() changePagination = new EventEmitter<number>();

    getValueByKey(data: any, key: string): any {
        return data[key as keyof typeof data];
    }

    onPageIndexChange(value: number) {
        this.changePagination.emit(value - 1);
    }

    //     DEFINE DATAINDEX SI
    // Pintar solo texto plano

    // DEFINE RENDER SI
    // Pintar texto navegando entre obj

    // DEFINE DATA INDEX AND ELEMENT AND ONCLICKELEMENT SI
    // pintar un elemento que contendra el valor y
    // ejecutara una accion

    // DEFINE ELEMENT AND ONCLICKELEMENT OR
    // ONSECONDCLICKELEMENT SI
    // Sera un componente que solo ejecutara funciones

    // DEFINE DATAINDEX AND ELEMENT AND DATAARRAY
    // PINTAR UN SELECT
}
