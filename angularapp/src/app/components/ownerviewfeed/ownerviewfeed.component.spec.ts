import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerviewfeedComponent } from './ownerviewfeed.component';

describe('OwnerviewfeedComponent', () => {
  let component: OwnerviewfeedComponent;
  let fixture: ComponentFixture<OwnerviewfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerviewfeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerviewfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
