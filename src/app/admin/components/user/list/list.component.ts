import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { AuthorizeUserDialogComponent } from '../../../../dialogs/authorize-user-dialog/authorize-user-dialog.component';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService,  } from '../../../../services/admin/alertify.service';
import { DialogService } from '../../../../services/common/dialog.service';
import { UserService } from '../../../../services/common/models/user.service';
import { ListUser } from 'src/app/contracts/users/list-user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent implements OnInit {


  constructor(spinner: NgxSpinnerService,
    private userService: UserService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService) {
    super(spinner)
  }


  displayedColumns: string[] = ['userName', 'nameSurname', 'email', 'twoFactorEnabled', 'role', 'delete'];
  dataSource: MatTableDataSource<ListUser> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getUsers() {
    this.showSpinner(SpinnerType.Cog);

    const allUsers: { totalUsersCount: number; users: ListUser[] } = await this.userService.getAllUsers(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5, () => this.hideSpinner(SpinnerType.Cog), errorMessage => this.alertifyService.message(errorMessage, {
      dismissothers: true,
      messageType: AlertifyMessageType.Error,
      messagePosition: AlertifyMessagePosition.TopRight
    }))
    this.dataSource = new MatTableDataSource<ListUser>(allUsers.users);
    this.paginator.length = allUsers.totalUsersCount;
  }

  async pageChanged() {
    await this.getUsers();
  }

  async ngOnInit() {
    await this.getUsers();
  }

  assignRole(id: string) {
    this.dialogService.openDialog({
      componentType: AuthorizeUserDialogComponent,
      data: id,
      options: {
        width: "750px"
      },
      afterClosed: () => {
        this.alertifyService.message("Roller başarıyla atanmıştır!", {
          messageType: AlertifyMessageType.Success,
          messagePosition: AlertifyMessagePosition.TopRight
        })
      }
    });
  }
}