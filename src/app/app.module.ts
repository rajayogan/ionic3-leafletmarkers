import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

//Firebase stuff
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule} from 'angularfire2/firestore';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MarkersProvider } from '../providers/markers/markers';

var config = {
  apiKey: "<yourapikeyhere>",
  authDomain: "<yourauthdomainhere>",
  databaseURL: "<yourdatabaseURLhere>",
  projectId: "<projectIdhere>",
  storageBucket: "<storageBuckethere>",
  messagingSenderId: "<yourmsgingsenderidhere>"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MarkersProvider
  ]
})
export class AppModule {}
