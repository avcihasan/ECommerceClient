import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { ListProductImage } from 'src/app/contracts/list-product-image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
import { DialogModule } from '../dialog.module';

declare var $:any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.css'],
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {
  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService:ProductService,
    private spinner:NgxSpinnerService,
    private dialogService:DialogService
  ) {
    super(dialogRef)
  }

  images:ListProductImage[];

 async ngOnInit() {
  this.spinner.show(SpinnerType.Cog)
    this.images= await this.productService.getImages(this.data as string,()=>this.spinner.hide(SpinnerType.Cog))
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "products",
    explanation: "Ürün resimini seçin veya buraya sürükleyin...",
    isAdminPage: true,
    queryString: `id=${this.data}`
  };


  async deleteImage(imageId:string,event:any){

    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
      data:DeleteState.Yes,
      afterClosed: async()=>{
        this.spinner.show(SpinnerType.SquarejellyBox)
        await this.productService.deleteImage(this.data as string,imageId,()=>{
          this.spinner.hide(SpinnerType.SquarejellyBox)
          var card=$(event.srcElement).parent().parent();
          card.fadeOut(500);
        })
      }
    })


  }
}


export enum SelectProductImageState {
  Close
}
