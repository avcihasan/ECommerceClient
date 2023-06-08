import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from '../../../base/base.component';
import { AuthorizeMenuDialogComponent } from '../../../dialogs/authorize-menu-dialog/authorize-menu-dialog.component';
import { DialogService } from '../../../services/common/dialog.service';
import { ApplicationService } from '../../../services/common/models/application.service';


interface ITreeController {
  name?: string,
  endPoints?: ITreeController[],
  code?: string
  controllerName?: string
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-authorize-menu',
  templateUrl: './authorize-menu.component.html',
  styleUrls: ['./authorize-menu.component.css']
})
export class AuthorizeMenuComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private applicationService: ApplicationService, private dialogService: DialogService) {
    super(spinner)
  }

  async ngOnInit() {
    this.dataSource.data = await (await this.applicationService.getAuthorizeDefinitionEndpoints())
      .map(m => {
        const treeController: ITreeController = {
          name: m.name,
          endPoints: m.endPoints.map(a => {
            const _treeController: ITreeController = {
              name: a.definition,
              code: a.code,
              controllerName: m.name
            }
            return _treeController;
          })
        };
        return treeController;
      });
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    (controller: ITreeController, level: number) => {
      return {
        expandable: controller.endPoints?.length > 0,
        name: controller.name,
        level: level,
        code: controller.code,
        controllerName: controller.controllerName
      };
    },
    controller => controller.level,
    controller => controller.expandable,
    controller => controller.endPoints
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  assignRole(code: string, name: string, controllerName: string) {
    debugger
    this.dialogService.openDialog({
      componentType: AuthorizeMenuDialogComponent,
      data: { code: code, name: name , controllerName: controllerName},
      options: {
        width: "750px"
      },
      afterClosed: () => {

      }
    });
  }
}