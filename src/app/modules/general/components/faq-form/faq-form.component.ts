import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';

import { FaqModel } from 'src/app/data/models/Faq.model';

import { FormUtils } from 'src/app/core/utils/form.util';

@Component({
    selector: 'app-faq-form',
    templateUrl: './faq-form.component.html',
    styleUrls: ['./faq-form.component.scss'],
})
export class FaqFormComponent implements OnInit {
    @Input() data?: FaqModel;
    @Output() onCancel = new EventEmitter();
    @Output() submitted = new EventEmitter<FaqModel>();

    validateForm!: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            id: [this.data?.id ?? null],
            question: [this.data?.question ?? null, [Validators.required]],
            answer: [this.data?.answer ?? null, [Validators.required]],
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
