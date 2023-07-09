import { Component, Input } from '@angular/core';

import { CustomHeader } from 'src/app/utils/Components.util';

@Component({
    selector: 'app-s-table',
    templateUrl: './s-table.component.html',
    styleUrls: ['./s-table.component.scss'],
})
export class STableComponent<T extends Object> {
    @Input() header: CustomHeader[] = [];
    @Input() data: T[] = [];
    @Input() isLoading: boolean = false;

    getValueByKey(data: any, key: string): any {
        return data[key as keyof typeof data];
    }
}
