import { Component } from '@angular/core';

@Component({
    selector: 'app-s-color-picker',
    templateUrl: './s-color-picker.component.html',
    styleUrls: ['./s-color-picker.component.scss'],
})
export class SColorPickerComponent {
    hue!: string;
    color!: string;
    showPicker: boolean = false;

    open() {
        this.showPicker = !this.showPicker;
    }
}
