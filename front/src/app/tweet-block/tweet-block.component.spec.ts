import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetBlockComponent } from './tweet-block.component';

describe('TweetBlockComponent', () => {
  let component: TweetBlockComponent;
  let fixture: ComponentFixture<TweetBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TweetBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
