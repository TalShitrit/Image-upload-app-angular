import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-local-upload',
  templateUrl: './local-upload.component.html',
  styleUrls: ['./local-upload.component.css']
})
export class LocalUploadComponent implements OnInit {

  constructor(public imgService: ImageService) { }
  imageData
  title

  ngOnInit(): void {
  }

  onFileChanged(event) {
    let file = event.target.files[0]
    let filename: string = file.name
    if (filename.endsWith('.png') || filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageData = reader.result
        this.imgService.updateBase64ImageData(this.imageData)
      }
    }
    else {
      event.target.value = null;
      //document.getElementById('inputUpload').value =null;
      alert("image can be only png/jpg/jpeg")
    }

  }

}


