import { Component, EventEmitter, Output, forwardRef } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzUploadFile, NzUploadXHRArgs } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';

import { FileUtils } from 'src/app/core/utils/file.utils';

@Component({
    selector: 'app-s-upload-file',
    templateUrl: './s-upload-file.component.html',
    styleUrls: ['./s-upload-file.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SUploadFileComponent),
            multi: true,
        },
    ],
})
export class SUploadFileComponent implements ControlValueAccessor {
    @Output() onGetBase64 = new EventEmitter<string | null>();

    loading = false;
    disabled = false;
    dataFile?: string | null;

    constructor(private msg: NzMessageService, private api$: AdminApiService) {}
    //omit external request
    onCustomRequest(item: NzUploadXHRArgs) {
        return new Observable((subscriber) => {
            const reader = new FileReader();
            reader.readAsDataURL(item.file as any);
            reader.onload = (e) => {
                subscriber.next(e.target?.result);
                subscriber.complete();
            };
        }).subscribe((res) => {
            item.onSuccess!(
                {
                    url: res,
                },
                item.file,
                null
            );
        });
    }

    onBeforeUpload = (file: NzUploadFile): Observable<boolean> =>
        new Observable((observer: Observer<boolean>) => {
            const isJpgOrPng =
                file.type === 'image/jpeg' ||
                file.type === 'image/jpg' ||
                file.type === 'image/png';

            if (!isJpgOrPng) {
                this.msg.error('You can only upload JPG, JPEG, PNG file!');
                observer.complete();
                return;
            }

            const isLt500KB = file.size! / 1024 / 1024 < 0.5;
            if (!isLt500KB) {
                this.msg.error('Image must smaller than 500kb!');
                observer.complete();
                return;
            }

            observer.next(isJpgOrPng && isLt500KB);
            observer.complete();
        });

    async onHandleChange(info: { file: NzUploadFile }): Promise<void> {
        switch (info.file.status) {
            case 'uploading':
                this.loading = true;
                break;
            case 'done':
                this.loading = false;
                this.dataFile = await FileUtils.getBase64(
                    info.file!.originFileObj!
                );
                this.onChange(this.dataFile);
                break;
            case 'error':
                this.msg.error('Network error');
                this.loading = false;
                break;
        }
    }

    onRemoveFile() {
        this.onChange((this.dataFile = null));
    }

    //methods to control value accessor
    onChange: any = (value: string) => {
        this.onGetBase64.emit(value);
    };

    onTouch: any = () => {};

    writeValue(obj: any): void {
        if (!FileUtils.isBase64(obj)) {
            this.onDownload(obj);
        } else {
            this.dataFile = obj;
        }
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

    onDownload(path: string) {
        this.loading = true;

        this.api$
            .downloadFiles('file/download', {
                path: encodeURIComponent(path ?? ''),
            })
            .subscribe({
                next: (file) => {
                    this.dataFile = URL.createObjectURL(file);
                    this.onChange(path);
                },
                error: (e) => {
                    this.loading = false;
                    this.onChange((this.dataFile = null));
                    console.error('Error occurred when getting image');
                },
                complete: () => (this.loading = false),
            });
    }
}
