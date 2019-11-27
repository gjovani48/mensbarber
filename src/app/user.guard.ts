import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate{
  constructor(private userService: UserService, private router: Router){

  }

  canActivate(): boolean {
    if(this.userService.loggedIn()){
        return true;
    }
    else{
      this.router.navigate(["/home"]);
      return false;
    }
  }
}
