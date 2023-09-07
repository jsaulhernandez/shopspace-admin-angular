import { CurrencyPipe } from '@angular/common';
import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
} from '@angular/core';

import { OnlyNumbersWithOneDotRegEx } from 'src/app/core/utils/RegEx.utils';

@Directive({
    selector: '[appCurrency]',
})
export class CurrencyDirective implements OnInit {
    @Input() appIsCurrency?: boolean;

    private el!: HTMLInputElement;

    constructor(
        private elementRef: ElementRef,
        private currencyPipe: CurrencyPipe
    ) {
        this.el = this.elementRef.nativeElement;
    }

    ngOnInit() {
        if (this.appIsCurrency)
            setTimeout(() => {
                this.el.value = this.currencyPipe.transform(
                    this.el.value,
                    'USD'
                )!;
            });
    }

    @HostListener('focus', ['$event.target.value'])
    onFocus(value: string) {
        if (this.appIsCurrency)
            this.el.value = value.replace(OnlyNumbersWithOneDotRegEx, '');
    }

    @HostListener('blur', ['$event.target.value'])
    onBlur(value: string) {
        if (this.appIsCurrency)
            this.el.value = this.currencyPipe.transform(value, 'USD')!;
    }

    @HostListener('keydown.control.z', ['$event.target.value'])
    onUndo(value: string) {
        if (this.appIsCurrency) this.el.value = '';
    }

    // private lastValid = '';
    // @HostListener('input', ['$event'])
    // onInput(event: Event) {
    //     const target = event.target as HTMLInputElement;
    //     const cleanValue = (
    //         target.value.match(OnlyDecimalsNumbersWithPointRegEx) || []
    //     ).join('');

    //     if (cleanValue || !target.value) this.lastValid = cleanValue;

    //     this.el.value = cleanValue || this.lastValid;
    // }
}
