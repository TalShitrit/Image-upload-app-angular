import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import AlbumInfo from 'src/app/models/albumInfo';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-album-info',
  templateUrl: './album-info.component.html',
  styleUrls: ['./album-info.component.css']
})
export class AlbumInfoComponent implements OnInit {
  albumInfo: AlbumInfo
  constructor(private apiDataService: ApiDataService, private router: Router) {
    this.apiDataService.getAlbumInfo().then((info) => {
      this.albumInfo = info
    })

  }

  ngOnInit(): void {
  }

  goNext = async () => {
    let missing = null
    if (!this.albumInfo.name) {
      missing = "album name is missing";
    }
    if (!this.albumInfo.description) {
      if (!missing) {
        missing = ""
      }
      missing += "\nalbum description is missing";
    }
    if (!this.albumInfo.showOption) {
      if (!missing) {
        missing = ""
      }
      missing += "\nalbum showOption is missing";
    }
    if (missing) {
      alert(missing)
      return
    }
    await this.apiDataService.saveAlbumInfo(this.albumInfo)
    this.router.navigateByUrl('/uploadImg');
  }
}
