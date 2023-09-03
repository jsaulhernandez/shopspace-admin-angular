import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-s-color-picker',
    templateUrl: './s-color-picker.component.html',
    styleUrls: ['./s-color-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SColorPickerComponent),
            multi: true,
        },
    ],
})
export class SColorPickerComponent implements ControlValueAccessor {
    hue!: string;
    color!: string;
    showPicker: boolean = false;

    open() {
        this.showPicker = !this.showPicker;
    }

    onSetColor(color: string) {
        this.color = color;
        this.onChange(this.color);
    }

    // ControlValueAccessor
    onChange = (color: string) => {};
    onTouched = () => {};

    touched = false;

    disabled = false;

    writeValue(obj: string): void {
        this.color = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
