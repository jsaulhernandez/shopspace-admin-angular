import {
    Component,
    EventEmitter,
    Input,
    Output,
    inject,
    OnInit,
    OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { SubCategoryModel } from 'src/app/data/models/SubCategory.model';
import { CategoryModel } from 'src/app/data/models/Category.model';

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

import { FormUtils } from 'src/app/core/utils/form.util';

@Component({
    selector: 'app-sub-category-form',
    templateUrl: './sub-category-form.component.html',
    styleUrls: ['./sub-category-form.component.scss'],
})
export class SubCategoryFormComponent implements OnInit, OnDestroy {
    @Input() data?: SubCategoryModel;
    @Output() onCancel = new EventEmitter();
    @Output() submitted = new EventEmitter<SubCategoryModel>();

    _categoryService = inject(AdminApiService);
    validateForm!: UntypedFormGroup;

    isLoading = this.loader$.loading$;
    categories: CategoryModel[] = [];
    subscriber!: Subscription;

    constructor(
        private fb: UntypedFormBuilder,
        private loader$: LoaderService
    ) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            id: [null],
            name: [null, [Validators.required]],
            status: ['1', [Validators.required]],
            category: this.fb.group({
                id: [null, [Validators.required]],
            }),
        });

        if (this.data)
            this.validateForm.patchValue({
                ...this.data,
                status: this.data?.status.toString() ?? '1',
                category: this.data.category,
            });

        this.getCategories();
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

    async getCategories() {
        this.loader$.show();
        this.subscriber = this._categoryService
            .request<SubCategoryModel[]>({
                method: 'GET',
                path: 'category/active',
            })
            .subscribe({
                next: (c) => {
                    this.categories = c.data || [];
                },
                error: (e) => {
                    this.loader$.hide();
                    this.categories = [];
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
