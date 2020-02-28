import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { TokenInterceptorService } from "./services/token-interceptor.service";


import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { AgmCoreModule } from '@agm/core';
//import { RequestMapComponent } from './component/request-map/request-map.component';



@NgModule({
  declarations: [AppComponent],

  entryComponents: [],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBZlkN9hLQtITqtBDS3yRE1cUErZ2zZPbg",
      libraries: ["places"]
    }),
    BrowserModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    Camera,
    FileTransfer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
