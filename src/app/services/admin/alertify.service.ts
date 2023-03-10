import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  message(  message: string,options:Partial<AlertifyOptions>) {
    alertify.set('notifier', 'delay', options.messageTime);
    alertify.set('notifier', 'position', options.messagePosition);
    const msg = alertify[options.messageType](message);
    if (options.dismissothers) {
      msg.dismissOthers();
    }
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: AlertifyMessageType = AlertifyMessageType.Message;
  messagePosition: AlertifyMessagePosition = AlertifyMessagePosition.TopLeft;
  messageTime: Number = 3;
  dismissothers: boolean = false;
}

export enum AlertifyMessageType {
  Error = 'error',
  Message = 'message',
  Success = 'success',
  Warning = 'warning'

}

export enum AlertifyMessagePosition {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  TopCenter = 'top-center',
  BottomCenter = 'bottom-center',
}
