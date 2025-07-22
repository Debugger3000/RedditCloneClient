import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseBlobComponent } from './firebase-blob.component';

describe('FirebaseBlobComponent', () => {
  let component: FirebaseBlobComponent;
  let fixture: ComponentFixture<FirebaseBlobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirebaseBlobComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirebaseBlobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
