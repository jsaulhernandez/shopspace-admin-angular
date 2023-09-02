import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

type ScriptEvent = () => void | {};

export interface IModalData {
    title?: string;
    includeFooter?: boolean;
    textOnConfirm?: string;
    textOnCancel?: string;
    onConfirm?: ScriptEvent;
    onCancel?: ScriptEvent;
    loading?: Observable<boolean>;
}

export interface IModalConfig extends IModalData {
    modalContent: TemplateRef<any>;
}
