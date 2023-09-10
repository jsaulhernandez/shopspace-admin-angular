import {
    Component,
    Input,
    forwardRef,
    EventEmitter,
    Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-s-input-coupon-code',
    templateUrl: './s-input-coupon-code.component.html',
    styleUrls: ['./s-input-coupon-code.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SInputCouponCodeComponent),
            multi: true,
        },
    ],
})
export class SInputCouponCodeComponent implements ControlValueAccessor {
    @Input() prefix?: string;
    @Input() suffix?: string;
    @Input() placeHolder: string = '';
    @Output() generate = new EventEmitter<void>();

    input?: string;
    disabled = false;

    onChange: any = (value: string) => {};

    onTouch: any = () => {};

    writeValue(obj: any): void {
        this.input = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
