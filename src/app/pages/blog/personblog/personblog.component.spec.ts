import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonblogComponent } from './personblog.component';

describe('PersonblogComponent', () => {
  let component: PersonblogComponent;
  let fixture: ComponentFixture<PersonblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
