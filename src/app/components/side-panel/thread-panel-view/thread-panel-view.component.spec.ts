import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadPanelViewComponent } from './thread-panel-view.component';

describe('ThreadPanelViewComponent', () => {
  let component: ThreadPanelViewComponent;
  let fixture: ComponentFixture<ThreadPanelViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadPanelViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadPanelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
