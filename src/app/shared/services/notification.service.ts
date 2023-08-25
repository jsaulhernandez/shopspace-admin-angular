import { Injectable } from '@angular/core';

import {
    NzNotificationDataOptions,
    NzNotificationRef,
    NzNotificationService,
} from 'ng-zorro-antd/notification';

import { INotificationData } from '../../data/interfaces/INotificationData.interface';
import { TypeNotification } from 'src/app/data/constants/constants';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    ref!: NzNotificationRef;

    constructor(private notification$: NzNotificationService) {}

    open(data: INotificationData, options?: NzNotificationDataOptions) {
        this.ref = this.notification$.create(
            data.type,
            data.title,
            data.content ?? '',
            {
                ...options,
                nzDuration: 2000,
                nzPlacement: 'topRight',
                nzAnimate: true,
            }
        );
    }

    onNotification(type: TypeNotification, title: string) {
        this.open({ type, title });
    }
}
