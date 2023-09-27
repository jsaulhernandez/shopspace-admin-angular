import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { CategoryModel } from 'src/app/data/models/Category.model';

import { FormUtils } from 'src/app/core/utils/form.util';

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
            id: [this.categoryData?.id ?? null],
            name: [this.categoryData?.name ?? null, [Validators.required]],
            image: [this.categoryData?.image ?? null, [Validators.required]],
            status: [this.categoryData?.status ?? 1, [Validators.required]],
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
