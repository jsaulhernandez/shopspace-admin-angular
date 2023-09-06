import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnInit,
    Renderer2,
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[appMasking]',
})
export class MaskingDirective implements OnInit {
    @Input() appMaskValue?: RegExp;
    private specialKeys = [
        'Backspace',
        'Delete',
        'Tab',
        'End',
        'Home',
        'ArrowLeft',
        'ArrowRight',
    ];

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
        private ngModel: NgModel
    ) {}

    ngOnInit(): void {}

    @HostListener('keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if (this.appMaskValue) {
            if (this.specialKeys.indexOf(event.key) !== -1) return;

            let current: string = this.elRef.nativeElement.value;
            let next: string = current.concat(event.key);

            if (next && !String(next).match(this.appMaskValue))
                event.preventDefault();
        }
    }
}
