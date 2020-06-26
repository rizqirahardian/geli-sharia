import { Component, Output, EventEmitter, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: 'otp.directive.html'
})
export class OtpDirective implements OnInit, OnChanges{

  @Output() onOtpResult = new EventEmitter<boolean>();
  @Output() onResendOtp = new EventEmitter<boolean>();
  @Input() display: string
  @Input() resendButton: boolean 

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('value changed', this.display);
  }

  verify(status) {
    this.onOtpResult.emit(status)
  }
  
  resendOtp(status) {
    this.onResendOtp.emit(status)
  }
}
