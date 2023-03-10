import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(spinner:NgxSpinnerService, private userService:UserService) {
    super(spinner)

  }

  ngOnInit(): void {

  }

  async login(usernameOrEmail:string,password:string){
    this.showSpinner(SpinnerType.Cog)
    await this.userService.login(usernameOrEmail,password,()=>this.hideSpinner(SpinnerType.Cog))
  }
}
