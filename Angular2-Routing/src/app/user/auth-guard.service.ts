import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router  } from "@angular/router";

import { AuthService } from "./auth.service"

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private authService: AuthService,
        private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn();
    }

    checkLoggedIn(): boolean {
        if(this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
}
