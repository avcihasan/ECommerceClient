import { Component, OnInit } from '@angular/core';
import { MessageType } from '@microsoft/signalr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';
import { ToastrMessagePosition, ToastrMessageType } from 'src/app/services/ui/custom-toastr.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private signalRService: SignalRService,private alertify: AlertifyService) {
    super(spinner);
  }


  ngOnInit(): void {
    // this.showSpinner(SpinnerType.SquarejellyBox)

    this.signalRService.on(HubUrls.ProductHub,ReceiveFunctions.ProductAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: AlertifyMessageType.Message,
        messagePosition: AlertifyMessagePosition.BottomCenter,
      })
    });

    this.signalRService.on(HubUrls.OrderHub, ReceiveFunctions.OrderAddedMessageReceiveFunction, message => {
      this.alertify.message(message, {
        messageType: AlertifyMessageType.Success,
        messagePosition: AlertifyMessagePosition.TopCenter
      })
    });
  }
  }


