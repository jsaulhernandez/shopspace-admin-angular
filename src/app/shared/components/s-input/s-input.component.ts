import {
    Component,
    EventEmitter,
    Input,
    Output,
    forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { TypesInputs } from 'src/app/data/constants/constants';

@Component({
    selector: 'app-s-input',
    templateUrl: './s-input.component.html',
    styleUrls: ['./s-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SInputComponent),
            multi: true,
        },
    ],
})
export class SInputComponent implements ControlValueAccessor {
    @Input() type: TypesInputs = 'input';
    @Input() typeInput: 'text' | 'password' = 'text';
    @Input() isInputGroup: boolean = false;
    @Input() placeHolder: string = '';
    @Input() prefix?: string;
    @Input() suffix?: string;
    @Input() maxLength: string | null = null;
    @Input() minLength: string | null = null;
    @Input() mask?: RegExp;
    @Input() isCurrency?: boolean = false;
    @Output() onChangeInput = new EventEmitter<string>();

    /**date picker */
    @Input() modeDatePicker: 'date' | 'week' | 'month' | 'year' = 'date';
    @Input() formatDatePicker: string = 'yyyy/MM/dd';

    input?: string;

    onChange: any = (value: string) => {
        this.onChangeInput.emit(value);
    };

    onTouch: any = () => {};

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    writeValue(input: string) {
        this.input = input;
    }
}
