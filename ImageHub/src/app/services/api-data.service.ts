import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from 'src/assets/config'
import AlbumInfo from '../models/albumInfo';
import { UserOptions } from '../models/userOption';
@Injectable({
  providedIn: 'root'
})

export class ApiDataService {
  updateData(data, title, toDelete) {
    const headers = { 'content-type': 'application/json' }
    let q = `?title=${title}`
    if (toDelete) {
      q += `&delete=${toDelete}`
    }
    return this.http.post(config.api + `/update${q}`, data, { 'headers': headers });

  }
  constructor(private http: HttpClient) {
  }

  postImgdata = (data) => {
    const headers = { 'content-type': 'application/json' }
    return this.http.post(config.api + '/upload', data, { 'headers': headers });

  }
  getdata = async (url: string, isprivte = false) => {
    if (isprivte) {
      if (url.includes('?')) {
        url += '&privte=true'
      }
      else {
        url += '?privte=true'
      }
    }
    let data = this.http.get(url).toPromise()
    return data
  }
  httpReqest = (url) => {
    this.http.get(url)
  }

  saveAlbumInfo = async (albumInfo: AlbumInfo) => {
    let data = JSON.stringify(albumInfo)
    const headers = { 'content-type': 'application/json' }

    let url = config.api + config.saveAlbumInfo

    let res = this.http.post(url, data, { 'headers': headers });
    return res.subscribe()
  }
  getAlbumInfo = () => {
    let url = config.api + config.getAlbumInfo
    let data = this.http.get<AlbumInfo>(url).toPromise()
    return data
  }
  saveUserOptions = async (userOptions: UserOptions) => {
    let data = JSON.stringify(userOptions)
    const headers = { 'content-type': 'application/json' }

    let url = config.api + config.saveUserOptions

    let res = this.http.post(url, data, { 'headers': headers });
    return res.subscribe()
  }
  getUserOptions = () => {
    let url = config.api + config.getUserOptions
    let data = this.http.get<UserOptions>(url).toPromise()
    return data
  }
}

