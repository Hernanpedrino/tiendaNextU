import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usersServices: UsersService,
              private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    const user = this.usersServices.activeUser();
    if (user) {
      console.log(user); 
      return true;
    } else {
      console.log('Rechazado x auth guard', user);
      this.router.navigateByUrl('/login')
      return false;
    }
  }
  
}
