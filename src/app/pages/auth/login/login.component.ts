import { Component, OnInit, inject } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

import { AuthRequest } from 'src/app/data/models/AuthRequest.model';
import { AuthResponse } from 'src/app/data/models/AuthResponse.model';

import { invalidate } from 'src/app/utils/form.util';

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

    constructor(private fb: UntypedFormBuilder, private router: Router) {}

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            email: [null, [Validators.required]],
            password: [null, [Validators.required]],
            // remember: [true],
        });
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            this.isLoading = true;
            this.authData = this.validateForm.value;

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
                            sessionStorage.setItem('jwt', data.token);
                            sessionStorage.setItem(
                                'expiration',
                                data.expirationToken
                            );

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
            invalidate(this.validateForm);
        }
    }

    // onRedirectToSignIn() {
    //     this.router.navigateByUrl('/sign-in');
    // }
}
