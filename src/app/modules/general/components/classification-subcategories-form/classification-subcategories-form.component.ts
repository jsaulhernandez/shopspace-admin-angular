import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { ClassificationModel } from 'src/app/data/models/Classification.model';
import { SubcategoryModel } from 'src/app/data/models/Subcategory.model';

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

import { FormUtils } from 'src/app/core/utils/form.util';

@Component({
    selector: 'app-classification-subcategories-form',
    templateUrl: './classification-subcategories-form.component.html',
    styleUrls: ['./classification-subcategories-form.component.scss'],
})
export class ClassificationSubcategoriesFormComponent {
    @Input() data?: ClassificationModel;
    @Output() onCancel = new EventEmitter();
    @Output() submitted = new EventEmitter<ClassificationModel>();

    validateForm!: UntypedFormGroup;

    isLoading = this.loader$.loading$;
    subcategories: SubcategoryModel[] = [];
    subscriber!: Subscription;

    constructor(
        private fb: UntypedFormBuilder,
        private loader$: LoaderService,
        private api$: AdminApiService
    ) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            id: [null],
            name: [null, [Validators.required]],
            status: ['1', [Validators.required]],
            categories: this.fb.group({
                id: [null, [Validators.required]],
            }),
        });

        if (this.data)
            this.validateForm.patchValue({
                ...this.data,
                status: this.data?.status.toString() ?? '1',
                categories: this.data.categories,
            });

        this.getSubcategories();
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

    getSubcategories() {
        this.loader$.show();
        this.subscriber = this.api$
            .request<SubcategoryModel[]>({
                method: 'GET',
                path: 'categories/active',
            })
            .subscribe({
                next: async (c) => {
                    this.subcategories = c.data || [];
                },
                error: (e) => {
                    this.loader$.hide();
                    this.subcategories = [];
                },
                complete: () => this.loader$.hide(),
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
