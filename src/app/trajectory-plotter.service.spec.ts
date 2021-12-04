import { TestBed } from '@angular/core/testing';

import { TrajectoryPlotterService } from './trajectory-plotter.service';

describe('TrajectoryPlotterService', () => {
  let service: TrajectoryPlotterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrajectoryPlotterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
