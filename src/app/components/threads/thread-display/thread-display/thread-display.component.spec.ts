import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadDisplayComponent } from './thread-display.component';

describe('ThreadDisplayComponent', () => {
  let component: ThreadDisplayComponent;
  let fixture: ComponentFixture<ThreadDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
