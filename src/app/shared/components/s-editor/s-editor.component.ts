import {
    Component,
    EventEmitter,
    Input,
    Output,
    forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuillModules } from 'ngx-quill';
import { QuillConfiguration } from 'src/app/data/constants/constants';

@Component({
    selector: 'app-s-editor',
    templateUrl: './s-editor.component.html',
    styleUrls: ['./s-editor.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SEditorComponent),
            multi: true,
        },
    ],
})
export class SEditorComponent implements ControlValueAccessor {
    @Input() placeHolder: string = '';
    @Input() customHeight: number = 120;
    @Output() onGetValue: EventEmitter<string> = new EventEmitter<string>();

    editor?: string;
    disabled = false;
    customModule: QuillModules = QuillConfiguration;

    onChange: any = (value: string) => {
        this.onGetValue.emit(value);
    };

    onTouch: any = () => {};

    writeValue(value: any): void {
        this.editor = value;
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
