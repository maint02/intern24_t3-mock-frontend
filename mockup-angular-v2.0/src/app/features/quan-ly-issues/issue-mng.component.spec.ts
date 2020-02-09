import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueMngComponent } from './issue-mng.component';

describe('IssueMngComponent', () => {
  let component: IssueMngComponent;
  let fixture: ComponentFixture<IssueMngComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueMngComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueMngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
