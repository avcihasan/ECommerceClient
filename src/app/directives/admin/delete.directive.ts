import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientService } from 'src/app/services/common/http-client.service';

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
    private alertify:AlertifyService
  ) {
    const img = _renderer.createElement('img');
    img.setAttribute('src', '../../../../../assets/trash.png');
    img.setAttribute('style', 'cursor: pointer;');
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick(){
    this.openDialog(async ()=>{
      this.spinner.show(SpinnerType.SquarejellyBox)
      const td:HTMLTableCellElement=this.element.nativeElement;

     this.httpService.delete({controller:this.controller},this.id).subscribe(data=>{
      $(td.parentElement).fadeOut(1000,()=>{
        this.callback.emit();
        this.alertify.message("Ürün başarılı bir şekilde silindi.",{dismissothers:true,messagePosition:AlertifyMessagePosition.TopCenter,messageType:AlertifyMessageType.Success})

      });
     },(err:HttpErrorResponse)=>{
      this.spinner.hide(SpinnerType.SquarejellyBox);
        this.alertify.message("Silme esnasında beklenmeyen bir hata ile kaşılaşıldı.",{dismissothers:true,messagePosition:AlertifyMessagePosition.TopCenter,messageType:AlertifyMessageType.Error})


     })

    })
  }


  openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result==DeleteState.Yes){
      afterClosed();
      }
    });
  }


}
