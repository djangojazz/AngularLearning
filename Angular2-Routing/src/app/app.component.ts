import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from "@angular/router"

import { AuthService } from './user/auth.service';

@Component({
    selector: 'pm-app',
    templateUrl: './app/app.component.html'
})
export class AppComponent {
    pageTitle: string = 'Acme Product Management';
    loading: boolean = true;

    constructor(private authService: AuthService, 
        private router: Router) { 
            router.events.subscribe((routerEvent: Event) => {
                this.checkRouterEvent(routerEvent);
            })
    }

    checkRouterEvent(routerEvent: Event): void {
        if(routerEvent instanceof NavigationStart) {
            this.loading = true;
        }

        if(routerEvent instanceof NavigationEnd ||
            routerEvent instanceof NavigationCancel ||
            routerEvent instanceof NavigationError) {
                this.loading = false;
            }
    }

    logOut(): void {
        this.authService.logout();
        this.router.navigateByUrl('/welcome');
    }
}
