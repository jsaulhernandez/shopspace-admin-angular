import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class BrandFormComponent implements OnInit {
    @Input() data?: BrandModel;
    @Output() onCancel = new EventEmitter();
    @Output() submitted = new EventEmitter<BrandModel>();

    validateForm!: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            id: [this.data?.id ?? null],
            name: [this.data?.name ?? null, [Validators.required]],
            image: [this.data?.image ?? null, [Validators.required]],
            status: [this.data?.status ?? 1, [Validators.required]],
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
