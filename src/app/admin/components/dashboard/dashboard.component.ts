import { Component, OnInit } from '@angular/core';
import {
  AlertifyService,
  MessagePosition,
  MessageType,
} from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private alertify: AlertifyService) {}

  ngOnInit(): void {}

  m() {
    this.alertify.message('SDfvgsad', {
      messagePosition: MessagePosition.BottomCenter,
      messageType: MessageType.Success,
      messageTime: 10,
    });
  }
  d() {
    this.alertify.dismiss();
  }
}
