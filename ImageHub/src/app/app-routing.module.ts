import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './Component/welcome/welcome.component';
import { AllowOptionsComponent } from './Component/allow-options/allow-options.component';
import { UploadImgComponent } from './Component/img-upload/upload-img/upload-img.component';

import { LocalUploadComponent } from './Component/img-upload/local-upload/local-upload.component';
import { AlbumComponent } from './Component/album/album.component';
import { LoginComponent } from './Component/login/login.component';
import { AlbumInfoComponent } from './Component/album-info/album-info.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'options', component: AllowOptionsComponent },
  { path: 'uploadImg', component: UploadImgComponent },
  { path: 'localUpload', component: LocalUploadComponent },
  { path: 'album', component: AlbumComponent },
  { path: 'login', component: LoginComponent },
  { path: 'albumInfo', component: AlbumInfoComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
