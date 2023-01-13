import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { AlertifyMessagePosition, AlertifyMessageType, AlertifyService } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessagePosition, ToastrMessageType } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  constructor(private httpClient:HttpClientService,private alertifyService:AlertifyService,private customToastrService:CustomToastrService) {

  }

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;


  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const formData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        formData.append(_file.name, _file, file.relativePath);
      });
    }
    this.httpClient.post({controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })},formData).subscribe(data=> {
        const message: string = "Dosyalar başarıyla yüklenmiştir.";

      if (this.options.isAdminPage) {
        this.alertifyService.message(message,
          {
            dismissothers: true,
            messageType: AlertifyMessageType.Success,
            messagePosition: AlertifyMessagePosition.TopRight
          })
      } else {
        this.customToastrService.message(message, "Başarılı.", {
          messageType: ToastrMessageType.Success,
          messagaPosition: ToastrMessagePosition.TopRight
        })
      }


    }, (errorResponse: HttpErrorResponse) => {

      const message: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.";

      if (this.options.isAdminPage) {
        this.alertifyService.message(message,
          {
            dismissothers: true,
            messageType: AlertifyMessageType.Error,
            messagePosition: AlertifyMessagePosition.TopRight
          })
      } else {
        this.customToastrService.message(message, "Başarsız.", {
          messageType: ToastrMessageType.Error,
          messagaPosition: ToastrMessagePosition.TopRight
        })
      }

    });
  }
}


export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
