import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideThreadsComponent } from './side-threads.component';

describe('SideThreadsComponent', () => {
  let component: SideThreadsComponent;
  let fixture: ComponentFixture<SideThreadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideThreadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
