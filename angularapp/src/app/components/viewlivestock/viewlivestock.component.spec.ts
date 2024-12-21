import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlivestockComponent } from './viewlivestock.component';

describe('ViewlivestockComponent', () => {
  let component: ViewlivestockComponent;
  let fixture: ComponentFixture<ViewlivestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewlivestockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlivestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
