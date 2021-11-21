import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-link-upload',
  templateUrl: './link-upload.component.html',
  styleUrls: ['./link-upload.component.css']
})
export class LinkUploadComponent implements OnInit {
  imageUrl
  constructor(public imgService: ImageService, private router: Router) { }
  imageData

  ngOnInit(): void {
  }


  getBase64Image = (img) => {
    return new Promise((res, rej) => {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      img.crossOrigin = 'Anonymous';
      let canvImg = new Image()
      canvImg.src = img.src
      canvImg.onload = () => {
        img.crossOrigin = 'Anonymous';
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        res(canvas.toDataURL())
      }
    })




  }

  uploadUrl(url: string) {
    try {
      if (url) {
        // if (url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        let canvImg = new Image()
        // canvImg.crossOrigin = 'Anonymous';
        canvImg.onerror = () => {
          canvImg.src = ""
          this.imgService.updateBase64ImageData("")
          alert("some error was made")
          canvImg.onerror = () => { }
        };
        canvImg.src = url
        canvImg.onload = () => {
          canvImg.crossOrigin = 'Anonymous';
          canvas.width = canvImg.width;
          canvas.height = canvImg.height;
          ctx.drawImage(canvImg, 0, 0, canvImg.width, canvImg.height);
          let data = canvas.toDataURL()
          this.imgService.updateBase64ImageData(data)
        }
        // }
        // else {
        //   alert("image can be only png/jpg/jpeg")

        // }
      }
    }
    catch (error) {
      alert("some error was made")
    }
  }
}