import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidePanelBlockComponent } from './side-panel-block.component';

describe('SidePanelBlockComponent', () => {
  let component: SidePanelBlockComponent;
  let fixture: ComponentFixture<SidePanelBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidePanelBlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidePanelBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
