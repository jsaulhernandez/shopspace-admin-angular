import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TypeText, TypeTextElement } from 'src/app/constants/constants';

@Component({
    selector: 'app-s-text',
    templateUrl: './s-text.component.html',
    styleUrls: ['./s-text.component.scss'],
})
export class STextComponent {
    @Input() typeTextElement: TypeTextElement = 'p';
    @Input() typeText?: TypeText;
    @Input() text: string = '';
    @Input() additionalClass?: string;
    @Input() textColor?: string;
    @Input() fontWeight?: string;
    @Output() btnClick: EventEmitter<any> = new EventEmitter();

    onClick() {
        this.btnClick && this.btnClick.emit();
    }

    getTextColor() {
        if (this.textColor) {
            if (this.textColor.includes('--')) {
                return `var(${this.textColor})`;
            }

            return this.textColor;
        }

        return '#000000';
    }

    getFontWeight() {
        if (this.fontWeight) return this.fontWeight;

        return 'auto';
    }
}
