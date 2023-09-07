import { DOCUMENT } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';
import {
    AfterViewInit,
    Directive,
    ElementRef,
    OnDestroy,
    Inject,
} from '@angular/core';
import { Subscription, filter, fromEvent } from 'rxjs';

@Directive({
    selector: '[appClickOutside]',
})
export class ClickOutsideDirective implements AfterViewInit, OnDestroy {
    @Output() clickOutside = new EventEmitter<void>();
    subscriber$?: Subscription;

    constructor(
        private el: ElementRef,
        @Inject(DOCUMENT) private doc: Document
    ) {}

    ngAfterViewInit(): void {
        this.subscriber$ = fromEvent(this.doc, 'click')
            .pipe(
                filter((evt) => {
                    return !this.clickInside(evt?.target as HTMLElement);
                })
            )
            .subscribe(() => {
                this.clickOutside.emit();
            });
    }

    ngOnDestroy(): void {
        this.subscriber$?.unsubscribe();
    }

    clickInside(element: HTMLElement): boolean {
        return (
            element === this.el.nativeElement ||
            this.el.nativeElement.contains(element)
        );
    }
}
