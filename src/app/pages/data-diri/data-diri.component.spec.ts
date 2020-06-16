import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDiriComponent } from './data-diri.component';

describe('DataDiriComponent', () => {
  let component: DataDiriComponent;
  let fixture: ComponentFixture<DataDiriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDiriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDiriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
