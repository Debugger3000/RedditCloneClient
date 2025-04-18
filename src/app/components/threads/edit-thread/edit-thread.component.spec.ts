import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThreadComponent } from './edit-thread.component';

describe('EditThreadComponent', () => {
  let component: EditThreadComponent;
  let fixture: ComponentFixture<EditThreadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditThreadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
