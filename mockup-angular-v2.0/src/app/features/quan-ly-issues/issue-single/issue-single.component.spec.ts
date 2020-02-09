import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueSingleComponent } from './issue-single.component';

describe('IssueSingleComponent', () => {
  let component: IssueSingleComponent;
  let fixture: ComponentFixture<IssueSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
