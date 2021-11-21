//---------------------Module --------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core'
import { WebcamModule } from 'ngx-webcam';

//---------------------Component--------------
import { AppComponent } from './app.component';
import { WelcomeComponent } from './Component/welcome/welcome.component';
import { LinksComponent } from './Component/links/links.component';
import { AllowOptionsComponent } from './Component/allow-options/allow-options.component';
import { LocalUploadComponent } from './Component/img-upload/local-upload/local-upload.component';
import { UploadImgComponent } from './Component/img-upload/upload-img/upload-img.component';
import { AlbumComponent } from './Component/album/album.component';
import { LinkUploadComponent } from './Component/img-upload/link-upload/link-upload.component';
import { WebCameraComponent } from './Component/img-upload/web-camera/web-camera.component';
import { LoginComponent } from './Component/login/login.component';
import { AlbumInfoComponent } from './Component/album-info/album-info.component';
import { MapComponent } from './Component/img-upload/map/map.component';
import { AlbumItemComponent } from './Component/album-item/album-item.component';

//---------------------FontAwesome --------------
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LinksComponent,
    AllowOptionsComponent,
    UploadImgComponent,
    LocalUploadComponent,
    AlbumComponent,
    LinkUploadComponent,
    WebCameraComponent,
    LoginComponent,
    AlbumInfoComponent,
    MapComponent,
    AlbumItemComponent
  ],
  imports: [FormsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    WebcamModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC7R-oxnTanW39-HXbBkq0DXE_qceBDoFQ',
      language: localStorage && localStorage.gml || 'he-il'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
