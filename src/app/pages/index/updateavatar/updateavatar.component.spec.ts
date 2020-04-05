import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateavatarComponent } from './updateavatar.component';

describe('UpdateavatarComponent', () => {
  let component: UpdateavatarComponent;
  let fixture: ComponentFixture<UpdateavatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateavatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateavatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
