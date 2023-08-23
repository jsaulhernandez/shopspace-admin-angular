import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
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

    static validateLength(value: number, option: 'min' | 'max'): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            if (FormUtils.isEmptyInputValue(control.value)) {
                return null;
            }

            const inputValue: string = control.value.toString();

            if (option === 'min') {
                if (inputValue.length < value) {
                    return {
                        invalid: true,
                        message: 'The minimum characters must be ' + value,
                    };
                }
            }

            if (option === 'max') {
                if (inputValue.length > value) {
                    return {
                        invalid: true,
                        message: 'The maximum characters must be ' + value,
                    };
                }
            }

            return null;
        };
    }
}
