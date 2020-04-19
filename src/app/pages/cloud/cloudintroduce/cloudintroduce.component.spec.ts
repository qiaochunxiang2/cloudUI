import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudintroduceComponent } from './cloudintroduce.component';

describe('CloudintroduceComponent', () => {
  let component: CloudintroduceComponent;
  let fixture: ComponentFixture<CloudintroduceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudintroduceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudintroduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
