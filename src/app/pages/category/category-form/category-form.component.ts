import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { CategoryModel } from 'src/app/data/models/Category.interface';

import { FormUtils } from 'src/app/utils/form.util';

@Component({
    selector: 'app-category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
    @Input() categoryData?: CategoryModel;
    @Output() onCancel = new EventEmitter();
    @Output() submitted = new EventEmitter<CategoryModel>();

    validateForm!: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            id: [null],
            name: [null, [Validators.required]],
            status: ['1', [Validators.required]],
        });

        if (this.categoryData)
            this.validateForm.patchValue({
                ...this.categoryData,
                status: this.categoryData?.status.toString() ?? '1',
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
