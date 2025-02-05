import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Autostart} from '@ionic-native/autostart/ngx';
import {UniqueDeviceID} from '@ionic-native/unique-device-id/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private autostart: Autostart,
        private uniqueDeviceID: UniqueDeviceID,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.statusBar.overlaysWebView(true);
            this.statusBar.styleBlackOpaque();
            this.statusBar.backgroundColorByHexString('#f96332');
            this.statusBar.hide();
            this.splashScreen.hide();
            this.autostart.enable();
            this.uniqueDeviceID.get().then((uuid: any) => {
                localStorage.setItem('uniqueDeviceID', uuid);
            }).catch((error: any) => {
                localStorage.setItem('uniqueDeviceID', null);
            });
        });
    }
}
