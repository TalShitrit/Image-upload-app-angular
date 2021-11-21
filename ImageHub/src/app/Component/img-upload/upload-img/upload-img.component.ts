import { Component, OnInit } from '@angular/core';
import { UserOptionsService } from 'src/app/services/user-options.service';
import { Router } from '@angular/router';
import ImageInfo from 'src/app/models/ImageInfo';
import { ImageService } from 'src/app/services/image.service';
import config from 'src/assets/config'
@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.css']
})
export class UploadImgComponent implements OnInit {
  imageinfo: ImageInfo
  uploadLocal = false
  uploadByLink = false
  uploadByCamera = false
  allCategories
  canUsemap: boolean
  constructor(private optionsService: UserOptionsService, private router: Router, public imgService: ImageService) {
    this.imageinfo = this.imgService.getImg()
    this.allCategories = config.categories
  }
  linkUpload = () => {
    this.imgService.updateImage(this.imageinfo)
    this.uploadByLink = true
    this.uploadLocal = false
    this.uploadByCamera = false
    // this.router.navigateByUrl('localUpload');
  }
  cameraUpload = () => {
    this.imgService.updateImage(this.imageinfo)
    this.uploadLocal = false
    this.uploadByLink = false
    this.uploadByCamera = true
  }
  localUpload = () => {
    this.imgService.updateImage(this.imageinfo)
    this.uploadLocal = true
    this.uploadByLink = false
    this.uploadByCamera = false
  }
  ngOnInit(): void {
    this.canUseMap()

  }
  Upload = () => {
    debugger
    let data = this.imgService.getImg().imageData
    if (data) {
      if (this.imgService.uploadImg()) {
        this.router.navigateByUrl('album');
      }
      else {
        alert('some value is missing')
      }
    }
    else {
      alert("Missing data")
    }
  }
  canUseMap = async () => {
    this.canUsemap = (await this.optionsService.getOptions()).locationOption
  }


}
