import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Updateavatar2Component } from './updateavatar2.component';

describe('UpdateavatarComponent', () => {
  let component: Updateavatar2Component;
  let fixture: ComponentFixture<Updateavatar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Updateavatar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Updateavatar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
