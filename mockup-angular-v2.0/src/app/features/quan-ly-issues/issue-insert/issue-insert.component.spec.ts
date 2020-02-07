import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueInsertComponent } from './issue-insert.component';

describe('IssueInsertComponent', () => {
  let component: IssueInsertComponent;
  let fixture: ComponentFixture<IssueInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IssueInsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
