import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserOptionsService } from './user-options.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {
  private aviable: boolean

  constructor(private optionsService: UserOptionsService) { this.aviable = false }
  login = async (password: string) => {
    return new Promise<boolean>((res, rej) => {

      this.optionsService.getOptions().then(
        (op) => {
          if (password == op.privateModePassword) { this.aviable = true }
          res(this.aviable)
        }
      )
    })


  }
  isPrivateMode = async () => {
    return new Promise<boolean>((res, rej) => {

      this.optionsService.getOptions().then(
        (op) => {
          res(op.privateMode)
        }
      )
    })
  }
  logout = () => {
    this.aviable = false
  }
  getStatus = () => this.aviable
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.aviable
  }
}
