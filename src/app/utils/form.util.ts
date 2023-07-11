import { FormGroup } from '@angular/forms';

export const invalidate = (form: FormGroup) => {
    Object.values(form.controls).forEach((control) => {
        if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
        }
    });
};
