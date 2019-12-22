import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActionSheetController } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationStatus } from './enums/authentication-status.enum';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

public appPages = [
  {
    title: 'My Todo List',
    url: '/home'
  },
  {
    title: 'My QR Code',
    url: '/list'
  },
  {
    title: 'Gesture Password',
    url: '/list'
  },
  {
    title: 'Account Manager',
    url: '/list'
  },
  {
    title: 'Settings',
    url: '/list'
  }
];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private actionSheetController: ActionSheetController,
    private authenticationService: AuthenticationService,
    private nav: NavController,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.authenticationState.subscribe(state => {
        console.log('Auth changed:', state);
        this.menu.swipeEnable(false);
        if (state === AuthenticationStatus.LOING ) {
          this.menu.swipeEnable(false);
          this.nav.navigateForward('user');
        } else {
          this.nav.navigateForward(['home']);
        }
      });
    });
  }
  async  logOut() {
    const asLogOut = await this.actionSheetController.create({
      header: 'logout will not delete any data,you can still log in with this account',
      cssClass: '',
      buttons: [{
        text: 'LogOut',
        role: 'destructive',
        handler: () => {
          console.log('Delete clicked');
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await asLogOut.present();
  }
}
