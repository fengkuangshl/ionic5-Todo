import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActionSheetController } from '@ionic/angular';

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
    private actionSheetController: ActionSheetController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
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
