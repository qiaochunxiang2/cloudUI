import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudFrameworkComponent } from './cloud-framework.component';

describe('CloudFrameworkComponent', () => {
  let component: CloudFrameworkComponent;
  let fixture: ComponentFixture<CloudFrameworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudFrameworkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudFrameworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
