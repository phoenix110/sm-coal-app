import { NgModule } from '@angular/core';
import { Platform, Events, ModalController } from 'ionic-angular';
import { CommonModule } from '../common/common.module';

import { AppService } from '../common/services/app.service';
import { UserService } from './services/user.service';

import { MePage } from './pages/me';
import { MeProfilePage } from './pages/me-profile';
import { MeProfileUpdatePage } from './pages/me-profileUpdate';

import { MeSettingPage } from './pages/me-setting';

import { HCAboutPage } from './pages/hc-about';
import { HCGuidePage } from './pages/hc-guide';
import { HCFeedbackPage } from './pages/hc-feedback';
import { HCDebugPage } from './pages/hc-debug';

import { AuthenticatePage } from './pages/authenticate';



@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MePage,
    MeProfilePage,
    MeProfileUpdatePage,
    MeSettingPage,
    HCAboutPage,
    HCGuidePage,
    HCFeedbackPage,
    HCDebugPage,
    AuthenticatePage,
  ],
  entryComponents: [
    MePage,
    MeProfilePage,
    MeProfileUpdatePage,
    MeSettingPage,
    HCAboutPage,
    HCGuidePage,
    HCFeedbackPage,
    HCDebugPage,
    AuthenticatePage,
  ],
  providers: [
    UserService,
  ],
  exports: [
  ],
})
export class UserModule {
  constructor(
    public platform: Platform,
    public events: Events,
    public heyApp: AppService,
    public userService: UserService,
    public modalCtrl: ModalController
  ) {

    // subcribe events
    this.subscribeEvents();

    // platform ready
    this.platform.ready().then(() => {
      // get user
      this.getUser();
    });
  }


  //
  // get user
  getUser() {
    setTimeout(() => {
      this.userService.getUser().then((userInfo) => {
        this.events.publish('auth:logIn', userInfo);
      }, () => {
        this.events.publish('auth:logOut');
      });
    }, 5000);
  }


  //
  // Subscribe events
  subscribeEvents() {
    //
    // subscribe app goto login
    this.events.subscribe('app:gotoLogin', (params) => {
      // this.heyApp.utilityComp.presentModal(AuthenticatePage);
      let modal = this.modalCtrl.create(AuthenticatePage)
      modal.present();
      console.log('present login page');
    });
  }
}
