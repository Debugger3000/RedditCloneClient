import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultUserImageComponent } from './default-user-image.component';

describe('DefaultUserImageComponent', () => {
  let component: DefaultUserImageComponent;
  let fixture: ComponentFixture<DefaultUserImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultUserImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefaultUserImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
