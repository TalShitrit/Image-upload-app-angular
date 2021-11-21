import { Injectable } from '@angular/core';
import { UserOptions } from '../models/userOption'
import { ApiDataService } from './api-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserOptionsService {
  constructor(private apiDataService: ApiDataService) {
  }
  updateOptons = (userOptions: UserOptions) => {
    if (userOptions.privateMode === false) {
      userOptions.privateModePassword = null
    }
    this.apiDataService.saveUserOptions(userOptions)
  }
  getOptions = async () => {
    let data = await this.apiDataService.getUserOptions()
    return data
  }
}
