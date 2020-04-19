import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogdetailedComponent } from './blogdetailed.component';

describe('BlogdetailedComponent', () => {
  let component: BlogdetailedComponent;
  let fixture: ComponentFixture<BlogdetailedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogdetailedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogdetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
