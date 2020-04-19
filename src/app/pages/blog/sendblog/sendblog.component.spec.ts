import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendblogComponent } from './sendblog.component';

describe('SendblogComponent', () => {
  let component: SendblogComponent;
  let fixture: ComponentFixture<SendblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
