import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanduanPembayaranComponent } from './panduan-pembayaran.component';

describe('PanduanPembayaranComponent', () => {
  let component: PanduanPembayaranComponent;
  let fixture: ComponentFixture<PanduanPembayaranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanduanPembayaranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanduanPembayaranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
