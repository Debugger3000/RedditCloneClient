import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadSideinfoComponent } from './thread-sideinfo.component';

describe('ThreadSideinfoComponent', () => {
  let component: ThreadSideinfoComponent;
  let fixture: ComponentFixture<ThreadSideinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThreadSideinfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThreadSideinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
