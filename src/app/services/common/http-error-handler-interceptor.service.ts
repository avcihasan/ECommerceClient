import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Observable } from 'rxjs';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService:CustomToastrService) { }

  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>
  {
    return next.handle(req).pipe(catchError(err=>{
      switch (err.status) {
        case HttpStatusCode.Unauthorized:
          this.toastrService.message("Bu işlemi yapmaya yetkiniz bulunmamaktadır!", "Yetkisiz işlem!", {
            messageType: ToastrMessageType.Warning,
            messagaPosition: ToastrMessagePosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.InternalServerError:
          this.toastrService.message("Sunucuya erişilmiyor!", "Sunucu hatası!", {
            messageType: ToastrMessageType.Warning,
            messagaPosition: ToastrMessagePosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.BadRequest:
          this.toastrService.message("Geçersiz istek yapıldı!", "Geçersiz istek!", {
            messageType: ToastrMessageType.Warning,
            messagaPosition: ToastrMessagePosition.BottomFullWidth
          });
          break;
        case HttpStatusCode.NotFound:
          this.toastrService.message("Sayfa bulunamadı!", "Sayfa bulunamadı!", {
            messageType: ToastrMessageType.Warning,
            messagaPosition: ToastrMessagePosition.BottomFullWidth
          });
          break;
        default:
          this.toastrService.message("Beklenmeyen bir hata meydana gelmiştir!", "Hata!", {
            messageType: ToastrMessageType.Warning,
            messagaPosition: ToastrMessagePosition.BottomFullWidth
          });
          break;
        }
      return of(err);
    }));
  }
}
