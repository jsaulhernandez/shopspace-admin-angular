import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { ClassificationModel } from 'src/app/data/models/Classification.model';
import { TypeClassificationModel } from 'src/app/data/models/TypeClassification.model';

import { AdminApiService } from 'src/app/data/services/core/admin-api.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

import { FormUtils } from 'src/app/core/utils/form.util';

@Component({
    selector: 'app-type-classification-form',
    templateUrl: './type-classification-form.component.html',
    styleUrls: ['./type-classification-form.component.scss'],
})
export class TypeClassificationFormComponent implements OnInit, OnDestroy {
    @Input() data?: TypeClassificationModel;
    @Output() onCancel = new EventEmitter();
    @Output() submitted = new EventEmitter<TypeClassificationModel>();

    validateForm!: UntypedFormGroup;

    isLoading = this.loader$.loading$;
    classifications: ClassificationModel[] = [];
    subscriber!: Subscription;

    constructor(
        private fb: UntypedFormBuilder,
        private loader$: LoaderService,
        private api$: AdminApiService
    ) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            id: [this.data?.id ?? null],
            name: [this.data?.name ?? null, [Validators.required]],
            status: [
                this.data?.status.toString() ?? '1',
                [Validators.required],
            ],
            classificationCategories: this.fb.group({
                id: [
                    this.data?.classificationCategories.id ?? null,
                    [Validators.required],
                ],
            }),
        });

        this.getClassifications();
    }

    ngOnDestroy(): void {
        this.subscriber.unsubscribe();
    }

    getClassifications() {
        this.loader$.show();
        this.subscriber = this.api$
            .request<ClassificationModel[]>({
                method: 'GET',
                path: 'classification-categories/active',
            })
            .subscribe({
                next: async (c) => {
                    this.classifications = c.data || [];
                },
                error: (e) => {
                    this.loader$.hide();
                    this.classifications = [];
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
