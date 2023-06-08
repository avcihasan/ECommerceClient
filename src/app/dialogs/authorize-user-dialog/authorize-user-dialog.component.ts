import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { RoleService } from '../../services/common/models/role.service';
import { UserService } from '../../services/common/models/user.service';
import { BaseDialog } from '../base/base-dialog';
import { ListRole } from 'src/app/contracts/role/list-role';

@Component({
  selector: 'app-authorize-user-dialog',
  templateUrl: './authorize-user-dialog.component.html',
  styleUrls: ['./authorize-user-dialog.component.css']
})
export class AuthorizeUserDialogComponent extends BaseDialog<AuthorizeUserDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<AuthorizeUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private userService: UserService,
    private spinner: NgxSpinnerService) {
    super(dialogRef)
  }
  roles: { datas: ListRole[], totalCount: number };
  assignedRoles: Array<string>;
  listRoles: { name: string, selected: boolean }[];
  async ngOnInit() {
    this.spinner.show(SpinnerType.Cog)
    this.assignedRoles = await this.userService.getRolesToUser(this.data, () => this.spinner.hide(SpinnerType.Cog));

    this.roles = await this.roleService.getRoles(-1, -1);

    this.listRoles = this.roles.datas.map((r: any) => {
      return {
        name: r.name,
        selected: this.assignedRoles?.indexOf(r.name) > -1
      }
    });
  }

  assignRoles(rolesComponent: MatSelectionList) {
    const roles: string[] = rolesComponent.selectedOptions.selected.map(o => o._text.nativeElement.innerText)
    this.spinner.show(SpinnerType.Cog);
    this.userService.assignRoleToUser(this.data, roles,
      () => {
        this.spinner.hide(SpinnerType.Cog);
      }, error => {

      })
  }
}