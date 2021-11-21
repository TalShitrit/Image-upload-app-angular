import { Component, OnInit } from '@angular/core';
import AlbumInfo from 'src/app/models/albumInfo';


import { ApiDataService } from 'src/app/services/api-data.service';
import { ImageService } from 'src/app/services/image.service';
import { LoginService } from 'src/app/services/login.service';
import config from 'src/assets/config'

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album
  allCategories
  albumInfo: AlbumInfo
  selectedToEdit
  selectedTitle
  constructor(private apiDataService: ApiDataService, private loginservice: LoginService,
    private ImageService: ImageService) {
  }

  ngOnInit(): void {
    this.allCategories = config.categories
    window.onload = async () => {
      await this.getdata()
      await this.loadAlbumInfo()
    }
  }
  getdata = async () => {
    this.album = await this.apiDataService.getdata(config.api + '/get', this.loginservice.getStatus())
  }
  getByTitle = async (title) => {
    this.album = await this.apiDataService.getdata(`${config.api}${config.apiGetData}?title=${title}`, this.loginservice.getStatus())
    // unselect the category
    document.getElementById('selectId').getElementsByTagName('option')[0].selected = true

  }
  getByCategory = async (event) => {
    let category = event.target.value
    this.album = await this.apiDataService.getdata(`${config.api}${config.apiGetData}?category=${category}`, this.loginservice.getStatus())
  }
  loadAlbumInfo = async () => {
    this.apiDataService.getAlbumInfo().then(data => {
      this.albumInfo = data
      let container = document.getElementById("imgContainer")
      if (this.albumInfo.showOption == "grid") {
        container.classList.add("showAsGrid")
      }
      else {
        container.classList.add("showAsList")
      }
    })
  }
  dbclick = (imageData) => {
    this.selectedTitle = imageData.title
    this.selectedToEdit = Object.assign({}, imageData);

    window.scrollTo(0, 0);

  }
  markerDragEnd($event: any) {
    this.selectedToEdit.mapCoords.lat = $event.latLng.lat();
    this.selectedToEdit.mapCoords.lng = $event.latLng.lng();
  }
  saveEdit = () => {
    this.ImageService.editImg(this.selectedToEdit, this.selectedTitle)
    this.selectedToEdit = null
  }
  exitEdit = () => {
    this.selectedToEdit = null
  }
  deleteEdit = () => {
    let conf = confirm(`Do you want to delete ${this.selectedToEdit.title}`)
    if (conf) {
      this.ImageService.editImg(this.selectedToEdit, this.selectedTitle, true)
      this.selectedToEdit = null
    }
  }
}
