import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { BrandModel } from 'src/app/data/models/Brand.model';

import { FormUtils } from 'src/app/core/utils/form.util';

@Component({
    selector: 'app-brand-form',
    templateUrl: './brand-form.component.html',
    styleUrls: ['./brand-form.component.scss'],
})
export class BrandFormComponent {
    @Input() data?: BrandModel;
    @Output() onCancel = new EventEmitter();
    @Output() submitted = new EventEmitter<BrandModel>();

    validateForm!: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            id: [null],
            name: [null, [Validators.required]],
            status: ['1', [Validators.required]],
        });

        if (this.data)
            this.validateForm.patchValue({
                ...this.data,
                status: this.data?.status.toString() ?? '1',
            });
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            this.submitted.emit(this.validateForm.getRawValue());
            this.validateForm.reset();
        } else {
            FormUtils.invalidate(this.validateForm);
        }
    }
}
