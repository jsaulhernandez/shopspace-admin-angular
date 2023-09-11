import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { differenceInCalendarDays } from 'date-fns';

import { CouponModel } from 'src/app/data/models/Coupon.model';

import { FormUtils } from 'src/app/core/utils/form.util';
import { OnlyNumbersRegEx } from 'src/app/core/utils/RegEx.utils';
import { CouponUtils } from 'src/app/core/utils/coupon.utils';

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
                {
                    value: this.data?.code ?? CouponUtils.generate(),
                    disabled: true,
                },
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

    onGenerateCouponCode() {
        this.validateForm.get('code')?.setValue(CouponUtils.generate());
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

    //disable dates before current date
    disabledDate = (current: Date): boolean =>
        differenceInCalendarDays(current, new Date()) <= 0;
}
