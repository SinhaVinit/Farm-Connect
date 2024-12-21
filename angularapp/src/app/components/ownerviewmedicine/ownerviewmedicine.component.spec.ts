import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerviewmedicineComponent } from './ownerviewmedicine.component';

describe('OwnerviewmedicineComponent', () => {
  let component: OwnerviewmedicineComponent;
  let fixture: ComponentFixture<OwnerviewmedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerviewmedicineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerviewmedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
