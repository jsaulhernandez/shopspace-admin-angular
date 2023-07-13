import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
    currentYear: number = new Date().getFullYear();

    constructor(protected auth: AuthService, private router: Router) {}

    onLogOut() {
        this.auth.logout().subscribe({
            next: (c) => {
                sessionStorage.removeItem('jwt');
                sessionStorage.removeItem('expiration');
            },
            error: (e) => {
                console.error('[Error] ' + e);
            },
            complete: () => this.router.navigate(['/login']),
        });
    }
}
