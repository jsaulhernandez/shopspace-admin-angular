import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';

import { ValidationEmail } from './RegEx.utils';

export class FormUtils extends Validators {
    static invalidate(form: FormGroup) {
        Object.values(form.controls).forEach((control) => {
            if (control.invalid) {
                control.markAsDirty();
                control.updateValueAndValidity({ onlySelf: true });
            }
        });
    }

    static isEmptyInputValue(value: String): boolean {
        return (
            typeof value === 'undefined' ||
            value === null ||
            value.trim() === ''
        );
    }

    static validateEmail(control: AbstractControl): ValidationErrors | null {
        if (FormUtils.isEmptyInputValue(control.value)) {
            return null;
        }

        return !ValidationEmail.test(control.value)
            ? { invalid: true, message: 'Email is invalid' }
            : null;
    }
}
