import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatelivestockComponent } from './createlivestock.component';

describe('CreatelivestockComponent', () => {
  let component: CreatelivestockComponent;
  let fixture: ComponentFixture<CreatelivestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatelivestockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatelivestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
