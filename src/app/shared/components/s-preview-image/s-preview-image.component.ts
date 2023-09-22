import { Component, Input, OnInit } from '@angular/core';

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';

import { FileUtils } from 'src/app/core/utils/file.utils';

import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-s-preview-image',
    templateUrl: './s-preview-image.component.html',
    styleUrls: ['./s-preview-image.component.scss'],
})
export class SPreviewImageComponent implements OnInit {
    @Input() path?: string | null;
    @Input() width: string = '100%';
    @Input() height: string | 'auto' = 'auto';
    @Input() maxHeight: string = '100%';
    @Input() heightSkeleton: string = '100%';

    isLoading: boolean = false;
    dataFile?: string | null;
    URL: string = environment.apiUrl;

    constructor(private api$: AdminApiService) {}

    ngOnInit(): void {
        if (!FileUtils.isBase64(this.path)) {
            this.onDownload();
        } else {
            this.dataFile = this.path;
        }
    }

    onDownload() {
        this.isLoading = true;

        this.api$
            .downloadFiles('file/download', {
                path: encodeURIComponent(this.path ?? ''),
            })
            .subscribe({
                next: (file) => {
                    this.dataFile = URL.createObjectURL(file);
                },
                error: (e) => {
                    this.isLoading = false;
                    this.dataFile = '/assets/default/default.webp';
                    console.error('Error occurred when getting image');
                },
                complete: () => (this.isLoading = false),
            });
    }
}
