import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../../../services/admin/alertify.service';
import { RoleService } from '../../../../services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(spiner: NgxSpinnerService,
    private roleService: RoleService,
    private alertify: AlertifyService) {
    super(spiner)
  }

  ngOnInit(): void {
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.Cog);


    this.roleService.create(name.value, () => {
      this.hideSpinner(SpinnerType.Cog);
      this.alertify.message("Role başarıyla eklenmiştir.", {
        dismissothers: true,
        messageType: AlertifyMessageType.Success,
        messagePosition: AlertifyMessagePosition.TopRight
      });
      this.createdRole.emit(name.value);
    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissothers: true,
          messageType: AlertifyMessageType.Error,
          messagePosition: AlertifyMessagePosition.TopRight
        });
    });
  }
}