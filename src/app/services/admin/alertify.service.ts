import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  message(  message: string,options:Partial<AlertifyOptions>) {
    debugger
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
  messageType: MessageType = MessageType.Message;
  messagePosition: MessagePosition = MessagePosition.TopLeft;
  messageTime: Number = 3;
  dismissothers: boolean = false;
}

export enum MessageType {
  Error = 'error',
  Message = 'message',
  Success = 'success',
  Warning = 'warning'

}

export enum MessagePosition {
  TopLeft = 'top-left',
  TopRight = 'top-right',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  TopCenter = 'top-center',
  BottomCenter = 'bottom-center',
}
