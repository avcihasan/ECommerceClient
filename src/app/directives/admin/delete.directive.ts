import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $:any;
@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private alertifyService: AlertifyService
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
    this.spinner.show(SpinnerType.BallScaleMultiple)
    const td:HTMLTableCellElement=this.element.nativeElement;
   await this.productService.delete(this.id);
    $(td.parentElement).fadeOut(1000,()=>{
      this.callback.emit();
    });
  }
}
