import { inject, Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, Router } from '@angular/router';
import { AuthService } from '../../domain/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class BlockAuthGuard implements CanActivate {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  canActivate(): MaybeAsync<GuardResult> {
    const token = this.authService.getToken();

    if (this.authService.isValid(token)) {
      this.router.navigate(['dashboard']);
      return false;
    }

    return true;
  }
}
