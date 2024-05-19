import { UserService } from './../services/user/user.service';
import { Injectable } from '@angular/core';
import { UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  //confere se o usuário esta logado para que possa acessar outras telas
  canActivate() :
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      if(!this.userService.isLoggedIn){
        this.router.navigate(['/home']);
        return false;
      }
      this.userService.isLoggedIn();
      return true;
    }
}
