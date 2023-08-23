import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    ActivatedRoute,
    ActivationEnd,
    NavigationEnd,
    NavigationStart,
    Router,
} from '@angular/router';
import { filter, map } from 'rxjs';

import { AuthService } from '../data/services/auth.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
    currentYear: number = new Date().getFullYear();
    title: string = '';
    navigationSubscription: any;

    constructor(protected auth: AuthService, private router: Router) {}
    ngOnInit(): void {
        this.navigationSubscription = this.getTitlePage();
    }

    getTitlePage() {
        this.router.events
            .pipe(
                filter((ev) => ev instanceof NavigationEnd),
                map(() => {
                    console.log('first');
                    let activeRoute: ActivatedRoute =
                        this.router.routerState.root;
                    let routerTitle = '';

                    while (activeRoute!.firstChild) {
                        activeRoute = activeRoute.firstChild;
                    }

                    if (activeRoute.snapshot.title) {
                        routerTitle = activeRoute.snapshot.title;
                    }

                    return routerTitle;
                })
            )
            .subscribe((title) => (this.title = title));
    }

    ngOnDestroy() {
        if (this.navigationSubscription) {
            this.navigationSubscription.unsubscribe();
        }
    }

    onLogOut() {
        this.auth.logout().subscribe({
            next: (c) => {
                this.auth.clearDataInSessionStorage();
            },
            error: (e) => {
                console.error('[Error] ' + e);
            },
            complete: () => this.router.navigate(['/auth/login']),
        });
    }
}
