import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    Renderer2,
} from '@angular/core';
import { NgModel } from '@angular/forms';

import { specialKeys } from 'src/app/data/constants/constants';

@Directive({
    selector: '[appMasking]',
})
export class MaskingDirective implements OnInit {
    @Input() appMaskValue?: RegExp;

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
        private ngModel: NgModel
    ) {}

    ngOnInit(): void {}

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (this.appMaskValue) {
            if (specialKeys.indexOf(event.key) !== -1) return;

            let current: string = this.elRef.nativeElement.value;
            let next: string = current.concat(event.key);

            if (next && !String(next).match(this.appMaskValue))
                event.preventDefault();
        }
    }
}
