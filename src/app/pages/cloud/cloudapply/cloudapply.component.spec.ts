import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudapplyComponent } from './cloudapply.component';

describe('CloudapplyComponent', () => {
  let component: CloudapplyComponent;
  let fixture: ComponentFixture<CloudapplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudapplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudapplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
