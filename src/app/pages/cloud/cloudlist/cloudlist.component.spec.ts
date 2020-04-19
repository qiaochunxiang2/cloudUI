import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudlistComponent } from './cloudlist.component';

describe('CloudlistComponent', () => {
  let component: CloudlistComponent;
  let fixture: ComponentFixture<CloudlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
