import { Injectable } from '@angular/core';
import ImageInfo from 'src/app/models/ImageInfo'
import { ApiDataService } from './api-data.service';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private uploadServise: ApiDataService) {
    this.imageInfo = new ImageInfo("", "", "", "", [], false, false)
  }
  private imageInfo: ImageInfo
  updateImage = (img: ImageInfo) => {
    this.imageInfo = img
  }
  updateBase64ImageData = (base64) => {
    this.imageInfo.imageData = base64
  }
  setMap = (mapCoords) => {
    this.imageInfo.mapCoords = mapCoords
  }
  getImg = () => {
    return this.imageInfo
  }
  uploadImg = () => {
    this.imageInfo.timeCreated = this.getDate()
    if (this.imageInfo.title) {
      if (this.imageInfo.imageData && this.imageInfo.imageData.length > 50) {
        let jsonData = JSON.stringify(this.imageInfo)
        let res = this.uploadServise.postImgdata(jsonData)

        res.subscribe()
        this.imageInfo = new ImageInfo("", "", "", "", [], false, false)
        return true
      }

    }
    else {
      return false
    }

  }
  editImg = (img, title, toDelete = false) => {
    if (img.title) {
      if (img.imageData && img.imageData.length > 50) {
        let jsonData = JSON.stringify(img)
        let res = this.uploadServise.updateData(jsonData, title, toDelete)
        res.subscribe()
        return true
      }

    }
    else {
      return false
    }

  }
  private getDate = () => {
    let today = new Date();
    let hh = String(today.getHours()).padStart(2, '0');
    let min = String(today.getMinutes()).padStart(2, '0');
    let sec = String(today.getSeconds()).padStart(2, '0');
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return `${hh}:${min}:${sec} ; ${dd}/${mm}/${yyyy}`
  }
}
