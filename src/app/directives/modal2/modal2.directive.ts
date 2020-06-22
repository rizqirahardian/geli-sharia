import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal2',
  templateUrl: 'modal2.directive.html'
})
export class Modal2Directive {

  @Input() nullField

  constructor(public activeModal: NgbActiveModal) { }

}
