import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { PaymentMethodModel } from 'src/app/data/models/PaymentMethod.model';

import { FormUtils } from 'src/app/core/utils/form.util';

@Component({
    selector: 'app-payment-method-form',
    templateUrl: './payment-method-form.component.html',
    styleUrls: ['./payment-method-form.component.scss'],
})
export class PaymentMethodFormComponent implements OnInit {
    @Input() data?: PaymentMethodModel;
    @Output() onCancel = new EventEmitter();
    @Output() submitted = new EventEmitter<PaymentMethodModel>();

    validateForm!: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            id: [this.data?.id ?? null],
            name: [this.data?.name ?? null, [Validators.required]],
            status: [
                this.data?.status.toString() ?? '1',
                [Validators.required],
            ],
            isCreditDebitCard: [
                this.data?.isCreditDebitCard.toString() ?? '1',
                [Validators.required],
            ],
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
