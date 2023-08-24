import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { ModalActionsType } from '../constants/constants';

type ScriptEvent = () => void;

export interface IModalData {
    type: ModalActionsType;
    title: string;
    open: boolean;
    onConfirm: ScriptEvent;
    loading: Observable<boolean>;
    isDanger: boolean;
    textConfirm?: string;
}
