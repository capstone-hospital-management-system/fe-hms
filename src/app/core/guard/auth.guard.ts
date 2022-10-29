import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router } from '@angular/router';

import { SessionService } from 'src/app/auth/services/session/session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private sessionService: SessionService) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    return this.checkLogin(next);
  }

  canLoad(): boolean {
    return true;
  }

  checkLogin(route: ActivatedRouteSnapshot): boolean {
    if (this.sessionService.isLogin()) {
      const currentRole = this.sessionService.getSession().authorities[0].authority.toUpperCase();
      if (route.data['roles'] && route.data['roles'].indexOf(currentRole) === -1) {
        this.router.navigateByUrl('/auth/login');
        return false;
      }
      return true;
    }
    return false;
  }
}
