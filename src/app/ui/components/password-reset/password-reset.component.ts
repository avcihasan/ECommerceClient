import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyOptions, AlertifyService} from '../../../services/admin/alertify.service';
import { UserAuthService } from '../../../services/common/models/user-auth.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent extends BaseComponent {

  constructor(spinner: NgxSpinnerService, private userAuthService: UserAuthService, private alertifyService: AlertifyService) {
    super(spinner)
  }

  passwordReset(email: string) {
    this.showSpinner(SpinnerType.Cog)
    this.userAuthService.passwordReset(email, () => {
      this.hideSpinner(SpinnerType.Cog)
      this.alertifyService.message("Mail başarıyla gönderilmiştir.", {
        messageType: AlertifyMessageType.Success,
        messagePosition: AlertifyMessagePosition.TopRight
      });
    })
  }
}