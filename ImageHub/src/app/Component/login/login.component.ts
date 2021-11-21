import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isPrivateMode: boolean
  constructor(public loginService: LoginService) {
    this.loginService.isPrivateMode().then((res) => {
      this.isPrivateMode = res
    })
  }

  ngOnInit(): void {
  }

  login = async (password) => {
    let res = await this.loginService.login(password)
    if (!res) {
      alert("password is not correct")
    }

  }
  logout = () => {
    this.loginService.logout()
  }
}
