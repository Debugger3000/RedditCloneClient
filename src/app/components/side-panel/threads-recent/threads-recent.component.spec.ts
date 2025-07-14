import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadsRecentComponent } from './threads-recent.component';

describe('ThreadsRecentComponent', () => {
  let component: ThreadsRecentComponent;
  let fixture: ComponentFixture<ThreadsRecentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadsRecentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadsRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
