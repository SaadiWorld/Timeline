import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterModule } from '@angular/router'; // Help us protect our routes
import { AuthService } from '../services/auth.service'; // Becaause we need to use that loggedIn function we created with jwt module
import { Observable } from 'rxjs'

@Injectable() /// decorator

export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService,
        private router: Router) {

    }

    canActivate() {
        if (this.authService.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}