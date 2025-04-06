import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewOutsideComponent } from './post-view-outside.component';

describe('PostViewOutsideComponent', () => {
  let component: PostViewOutsideComponent;
  let fixture: ComponentFixture<PostViewOutsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostViewOutsideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostViewOutsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
