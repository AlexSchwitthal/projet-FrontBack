import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFollowerComponent } from './list-follower.component';

describe('ListFollowerComponent', () => {
  let component: ListFollowerComponent;
  let fixture: ComponentFixture<ListFollowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFollowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
