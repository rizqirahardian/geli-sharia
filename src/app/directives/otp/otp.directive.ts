import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: 'otp.directive.html'
})
export class OtpDirective {

  @Output() onOtpResult = new EventEmitter<boolean>();

  constructor() { }

  verify(status) {
    this.onOtpResult.emit(status)
  }

}
