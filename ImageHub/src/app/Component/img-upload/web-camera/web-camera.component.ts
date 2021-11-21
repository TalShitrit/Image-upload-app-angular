
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import ImageInfo from 'src/app/models/ImageInfo';
import { ApiDataService } from 'src/app/services/api-data.service';

import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-web-camera',
  templateUrl: './web-camera.component.html',
  styleUrls: ['./web-camera.component.css']
})
export class WebCameraComponent implements OnInit {

  constructor(private imgService: ImageService) {
    this.imageinfo = this.imgService.getImg()
  }
  imageinfo: ImageInfo
  //----------------------------
  //@Output() getPicture = new EventEmitter<WebcamImage>();
  showWebcam = true;
  isCameraExist = true;

  errors: WebcamInitError[] = [];

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  onOffWebCame() {
    this.showWebcam = !this.showWebcam;
  }

  handleInitError(error: WebcamInitError) {
    this.errors.push(error);
  }

  handleImage(webcamImage: WebcamImage) {

    this.imageinfo.imageData = webcamImage.imageAsDataUrl
    this.imgService.updateBase64ImageData(this.imageinfo.imageData)
    this.showWebcam = false;
  }
  get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  takeSnapshot(): void {
    this.trigger.next();
  }
  //----------------------------
  ngOnInit(): void {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.isCameraExist = mediaDevices && mediaDevices.length > 0;
      })
    this.showWebcam = false

  }

}