import { TypeNotification } from '../constants/constants';

export interface INotificationData {
    type: TypeNotification;
    title: string;
    content?: string;
}
