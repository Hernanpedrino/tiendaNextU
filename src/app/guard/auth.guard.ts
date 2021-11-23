import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usersSerivce: UsersService,
              private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):boolean{
    const token = localStorage.getItem('idToken');
    if (token === null) {
      this.router.navigateByUrl('/login');
      return false
    } else {
      return true;
    }
  }
  
}
