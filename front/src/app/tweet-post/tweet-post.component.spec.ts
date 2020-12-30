import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetPostComponent } from './tweet-post.component';

describe('TweetComponent', () => {
  let component: TweetPostComponent;
  let fixture: ComponentFixture<TweetPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
