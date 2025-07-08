import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentVotesComponent } from './comment-votes.component';

describe('CommentVotesComponent', () => {
  let component: CommentVotesComponent;
  let fixture: ComponentFixture<CommentVotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentVotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentVotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
