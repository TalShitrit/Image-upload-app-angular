import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserOptionsService } from 'src/app/services/user-options.service';
import { UserOptions } from '../../models/userOption'

@Component({
  selector: 'app-allow-options',
  templateUrl: './allow-options.component.html',
  styleUrls: ['./allow-options.component.css']
})
export class AllowOptionsComponent implements OnInit {
  options: UserOptions

  constructor(private optionsService: UserOptionsService, private router: Router) {
    optionsService.getOptions().then((op) => {
      this.options = op
    })
  }

  ngOnInit(): void {
  }
  goNext = () => {
    if (this.options.privateMode) {
      if (!this.options.privateModePassword) {
        alert("enter password")
        document.getElementById("passwordInput").focus()
      }
      else {
        this.optionsService.updateOptons(this.options)
        this.router.navigateByUrl('/albumInfo');
      }
    }
    else {
      let res = confirm("do you plan not to use private Mode?")
      if (res) {

        this.optionsService.updateOptons(this.options)
        this.router.navigateByUrl('/albumInfo');
      }
    }

  };
}



