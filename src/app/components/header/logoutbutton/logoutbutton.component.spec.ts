import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutbuttonComponent } from './logoutbutton.component';

describe('LogoutbuttonComponent', () => {
  let component: LogoutbuttonComponent;
  let fixture: ComponentFixture<LogoutbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutbuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
