import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerviewrequestComponent } from './ownerviewrequest.component';

describe('OwnerviewrequestComponent', () => {
  let component: OwnerviewrequestComponent;
  let fixture: ComponentFixture<OwnerviewrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerviewrequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerviewrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
