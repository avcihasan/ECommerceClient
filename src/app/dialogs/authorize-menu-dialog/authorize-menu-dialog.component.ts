import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { RoleService } from 'src/app/services/common/models/role.service';
import { AuthorizationEndpointService } from 'src/app/services/common/models/authorization-endpoint.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListRole } from 'src/app/contracts/role/list-role';
import { MatSelectionList } from '@angular/material/list';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-authorize-menu-dialog',
  templateUrl: './authorize-menu-dialog.component.html',
  styleUrls: ['./authorize-menu-dialog.component.css']
})
export class AuthorizeMenuDialogComponent extends BaseDialog<AuthorizeMenuDialogComponent> implements OnInit  {
  constructor(dialogRef: MatDialogRef<AuthorizeMenuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private authorizationEndpointService: AuthorizationEndpointService,
    private spinner: NgxSpinnerService) {
    super(dialogRef)
  }
  roles: { datas: ListRole[], totalCount: number };
  assignedRoles: Array<string>;
  listRoles: { name: string, selected: boolean }[];
  async ngOnInit() {
    this.assignedRoles = await this.authorizationEndpointService.getRolesToEndpoint(this.data.code, this.data.controllerName);
debugger
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
    this.authorizationEndpointService.assignRoleEndpoint(roles, this.data.code, this.data.controllerName,
      () => {
        this.spinner.hide(SpinnerType.Cog);
      }, error => {

      })
  }
}

export enum AuthorizeMenuState {
  Yes,
  No
}