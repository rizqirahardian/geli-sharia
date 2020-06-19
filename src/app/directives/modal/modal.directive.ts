import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.directive.html',
  styleUrls: ['./modal.directive.css']
})
export class ModalDirective {

  @Input() product
  @Input() age
  @Input() premi
  @Input() manfaat

  constructor() { }

}
