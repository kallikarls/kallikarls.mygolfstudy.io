import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajectoryPage } from './trajectory.page';

describe('TrajectoryPage', () => {
  let component: TrajectoryPage;
  let fixture: ComponentFixture<TrajectoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrajectoryPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajectoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
