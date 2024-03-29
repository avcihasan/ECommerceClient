import {NgxSpinnerService } from "ngx-spinner";


export class BaseComponent{

  constructor(private spinner:NgxSpinnerService) { }

showSpinner(spinnerType:SpinnerType){
  this.spinner.show(spinnerType);

  // setTimeout(function() {
  //   this.spinner.hide(spinnerType)
  // }, 1000);

}

hideSpinner(spinnerType:SpinnerType){
  this.spinner.hide(spinnerType)
}

}
export enum SpinnerType{
  BallScaleMultiple="s1",
  SquarejellyBox="s2",
  Cog="s3"
}
