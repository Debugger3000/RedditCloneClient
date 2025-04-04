import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupThreadsComponent } from './group-threads.component';

describe('GroupThreadsComponent', () => {
  let component: GroupThreadsComponent;
  let fixture: ComponentFixture<GroupThreadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupThreadsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupThreadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
