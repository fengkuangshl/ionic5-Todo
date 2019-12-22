import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationStatus } from '../enums/authentication-status.enum';
import { UserService } from '../modules/user/services/user.service';
import { User } from '../modules/user/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    authenticationState = new BehaviorSubject(AuthenticationStatus.LOING);
    isAuth = new BehaviorSubject(false);

  constructor(private plt: Platform, private userService: UserService) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  getAuthenticationStatus(): AuthenticationStatus {
    return this.authenticationState.value;
  }

  isAuthenticated() {
    return this.isAuth.value;
  }

  checkToken() {
    return this.userService.getLoginUser().then(user => {
      if (user) {
        const u: User = JSON.parse(user);
        if (u.isAutoLogin) {
          if (u.isEnableGesturePassword && u.gesturePassword) {
            this.authenticationState.next(AuthenticationStatus.GESTURE_PASSWORD_LOGIN);
          } else {
            this.authenticationState.next(AuthenticationStatus.AUTO_LOGIN);
          }
        } else {
          this.authenticationState.next(AuthenticationStatus.SUCCESS);
        }
        this.isAuth.next(true);
      } else {
        this.authenticationState.next(AuthenticationStatus.AUTO_LOGIN);
        this.isAuth.next(false);
      }
    });
  }
}
