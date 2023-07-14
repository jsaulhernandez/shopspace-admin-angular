import { Component, OnInit, inject } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/services/auth.service';

import { AuthRequest } from 'src/app/data/models/AuthRequest.model';
import { AuthResponse } from 'src/app/data/models/AuthResponse.model';

import { UserState } from 'src/app/store/states/user-state.state';

import { FormUtils } from 'src/app/utils/form.util';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    _authService = inject(AuthService);
    validateForm!: UntypedFormGroup;

    isLoading: boolean = false;
    authData!: AuthRequest;

    constructor(
        private fb: UntypedFormBuilder,
        private router: Router // private store: Store<UserState>
    ) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            email: [null, [Validators.required, FormUtils.validateEmail]],
            password: [
                null,
                [Validators.required, FormUtils.validateLength(8, 'min')],
            ],
            // remember: [true],
        });
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            this.isLoading = true;
            this.authData = this.validateForm.value;

            // this.store.dispatch(new LogIn(this.authData ));

            this._authService
                .useRequestAuth<any>({
                    method: 'POST',
                    path: 'auth/login',
                    data: this.authData,
                })
                .subscribe({
                    next: (auth) => {
                        if (auth.data) {
                            const data: AuthResponse = auth.data;
                            this._authService.saveDataInSessionStorage(data);
                            this.router.navigateByUrl('/admin/category');
                        } else {
                            console.log('Data is empty');
                        }
                    },
                    error: (e) => {
                        this.isLoading = false;
                    },
                    complete: () => (this.isLoading = false),
                });
        } else {
            FormUtils.invalidate(this.validateForm);
        }
    }

    // onRedirectToSignIn() {
    //     this.router.navigateByUrl('/sign-in');
    // }
}
