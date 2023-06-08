import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { DialogService } from 'src/app/services/common/dialog.service';

declare var $:any;
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpService:HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertify:AlertifyService,
    private dialogService:DialogService
  ) {
    const img = _renderer.createElement('img');
    img.setAttribute('src', '../../../../../assets/trash.png');
    img.setAttribute('style', 'cursor: pointer;');
    img.setAttribute('width', '25');
    img.setAttribute('height', '25');
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick(){
    this.dialogService.openDialog({
      componentType:DeleteDialogComponent,
       data:DeleteState.Yes,
       afterClosed:async ()=>{
        this.spinner.show(SpinnerType.SquarejellyBox)
        const td:HTMLTableCellElement=this.element.nativeElement;
       this.httpService.delete({controller:this.controller},this.id).subscribe(data=>{
        $(td.parentElement).fadeOut(1000,()=>{
          this.spinner.hide(SpinnerType.SquarejellyBox);

          this.callback.emit();
          this.alertify.message(`${this.controller == 'roles' ? 'Rol' : 'Ürün'} başarıyla silinmiştir.`,{dismissothers:true,messagePosition:AlertifyMessagePosition.TopCenter,messageType:AlertifyMessageType.Success})

        });
       },(err:HttpErrorResponse)=>{
        this.spinner.hide(SpinnerType.SquarejellyBox);
          this.alertify.message("Silme esnasında beklenmeyen bir hata ile kaşılaşıldı.",{dismissothers:true,messagePosition:AlertifyMessagePosition.TopCenter,messageType:AlertifyMessageType.Error})


       })

      }
    })
  }




}
