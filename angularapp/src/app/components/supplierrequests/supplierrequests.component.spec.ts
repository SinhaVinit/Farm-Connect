import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierrequestsComponent } from './supplierrequests.component';

describe('SupplierrequestsComponent', () => {
  let component: SupplierrequestsComponent;
  let fixture: ComponentFixture<SupplierrequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierrequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierrequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
