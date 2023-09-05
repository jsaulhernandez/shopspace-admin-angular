import { Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IColorData } from 'src/app/data/interfaces/IColorData.interface';

import { Color } from 'src/app/core/utils/color.utils';

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
    @Output()
    getColor: EventEmitter<string> = new EventEmitter<string>();

    hue!: string;
    color!: string;
    showPicker: boolean = false;

    isInputValue: boolean = false;
    hex: string = '';
    rgba: IColorData = { r: '', g: '', b: '', a: '' };

    open() {
        this.showPicker = !this.showPicker;
    }

    onSetColor(color: string) {
        this.onChangeHexToRgba(color, true);
    }

    onChangeHexToRgba(color: string, fromPalette: boolean = false) {
        this.hex = this.color = color ?? '#ffffff';
        const rgbaValue = Color.hexToRgba(this.hex);
        this.rgba = Color.getValuesFromRgba(rgbaValue);
        if (fromPalette) {
            this.onChange(this.color);
        } else {
            this.hue = rgbaValue;
        }
    }

    getValueHex(hex: string) {
        if (hex.trim().length === 7 && hex.trim().includes('#')) {
            this.isInputValue = true;
            this.onChangeHexToRgba(hex);
            this.onChange(this.color);
        }
    }

    // ControlValueAccessor
    touched = false;
    disabled = false;

    onChange: any = (color: string) => {
        this.getColor.emit(color);
    };

    onTouched: any = () => {};

    writeValue(obj: string): void {
        if (obj) this.onChangeHexToRgba(obj);
        else this.color = obj;
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
