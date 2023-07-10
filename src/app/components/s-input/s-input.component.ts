import { Component, Input, forwardRef } from '@angular/core';
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
    onChange: any = () => {};
    onTouch: any = () => {};
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    input?: string;
    writeValue(input: string) {
        this.input = input;
    }

    @Input() typeInput: 'text' | 'password' = 'text';
    @Input() isInputGroup: boolean = false;
    @Input() placeHolder: string = '';
    @Input() prefix?: string;
    @Input() suffix?: string;
}
