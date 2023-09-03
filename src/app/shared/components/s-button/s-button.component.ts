import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ThemeTypeIcon, TypeButton } from 'src/app/data/constants/constants';

@Component({
    selector: 'app-s-button',
    templateUrl: './s-button.component.html',
    styleUrls: ['./s-button.component.scss'],
})
export class SButtonComponent {
    public buttonText = 'BUTTON TEXT';

    @Input()
    set text(name: string) {
        this.buttonText = name.toUpperCase();
    }

    @Input() type: TypeButton = 'primary';
    @Output() btnClick = new EventEmitter<MouseEvent>();
    @Input() isDisabled = false;
    @Input() isLoading = false;
    @Input() isDanger = false;
    @Input() prefix: string = '';
    @Input() suffix: string = '';
    @Input() themeIcon: ThemeTypeIcon = 'outline';
    @Input() additionalClass: string = '';

    constructor() {}

    get name(): string {
        return this.buttonText;
    }

    onClick(evt: MouseEvent) {
        this.btnClick.emit(evt);
    }
}
