import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnereditlivestockComponent } from './ownereditlivestock.component';

describe('OwnereditlivestockComponent', () => {
  let component: OwnereditlivestockComponent;
  let fixture: ComponentFixture<OwnereditlivestockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnereditlivestockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnereditlivestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
