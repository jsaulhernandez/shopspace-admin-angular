import {
    Component,
    EventEmitter,
    Input,
    Output,
    forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    @Input() typeInput: 'text' | 'password' = 'text';
    @Input() isInputGroup: boolean = false;
    @Input() placeHolder: string = '';
    @Input() prefix?: string;
    @Input() suffix?: string;
    @Output() onChangeInput = new EventEmitter<string>();

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
