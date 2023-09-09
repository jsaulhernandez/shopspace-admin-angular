import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { CouponModel } from 'src/app/data/models/Coupon.model';

import { FormUtils } from 'src/app/core/utils/form.util';
import { OnlyNumbersRegEx } from 'src/app/core/utils/RegEx.utils';

@Component({
    selector: 'app-coupon-form',
    templateUrl: './coupon-form.component.html',
    styleUrls: ['./coupon-form.component.scss'],
})
export class CouponFormComponent implements OnInit {
    @Input() data?: CouponModel;
    @Output() onCancel = new EventEmitter();
    @Output() submitted = new EventEmitter<CouponModel>();

    //regex
    onlyNumbers: RegExp = OnlyNumbersRegEx;

    validateForm!: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            id: [this.data?.id ?? null],
            code: [
                this.data?.code ?? null,
                [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(6),
                ],
            ],
            off: [this.data?.off ?? null, [Validators.required]],
            expireAt: [this.data?.expireAt ?? null, [Validators.required]],
            status: [this.data?.status ?? 1, [Validators.required]],
        });
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            const data: CouponModel = {
                ...this.validateForm.getRawValue(),
                createdAt: new Date(),
            };

            this.submitted.emit(data);
            this.validateForm.reset();
        } else {
            FormUtils.invalidate(this.validateForm);
        }
    }
}
