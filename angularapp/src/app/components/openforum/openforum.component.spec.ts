import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenforumComponent } from './openforum.component';

describe('OpenforumComponent', () => {
  let component: OpenforumComponent;
  let fixture: ComponentFixture<OpenforumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenforumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenforumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
