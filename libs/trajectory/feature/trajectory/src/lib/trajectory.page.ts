import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { TrajectoryService } from '@mgs/shared/data-access/trajectory';
import { Subject, takeUntil } from 'rxjs';

@Component({
  templateUrl: './trajectory.page.html',
  styleUrls: ['./trajectory.page.scss'],
})
export class TrajectoryPage implements OnDestroy {
  @ViewChild(BaseChartDirective)
  set pane(v: BaseChartDirective) {
    if (this.chart) return;
    setTimeout(() => {
      this.chart = v;
      this.renderShot();
    }, 0);
  }
  chart!: BaseChartDirective;
  shotLength = '0';
  shotHeight = '0';
  data: any = [];
  ballLaunchInputForm = this.formBuilder.group({
    ballSpeedMph: '140',
    launchAngle: '13',
    spinRate: '2300',
  });
  lineChartType: ChartType = 'line';
  lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'Ball flight',
        data: [],
        fill: false,
      },
    ],
  };
  lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        display: true,
        type: 'linear',
        position: 'bottom',
        ticks: {
          callback: function (value: any) {
            return parseFloat(value).toFixed(0);
          },
          autoSkip: true,
          stepSize: 50,
        },
      },
      y: {
        ticks: {
          stepSize: 5,
          precision: 0,
        },
      },
    },
  };

  private unsubscribe$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private trajectoryService: TrajectoryService
  ) {}

  onSubmit() {
    this.renderShot();
  }

  renderShot() {
    this.trajectoryService
      .getTrajectory(
        this.ballLaunchInputForm.controls.ballSpeedMph.value,
        this.ballLaunchInputForm.controls.launchAngle.value,
        this.ballLaunchInputForm.controls.spinRate.value
      )
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response) => {
        this.lineChartData.datasets[0].data = [];
        if (response.length > 0) {
          this.shotLength = response[response.length - 1].x.toFixed(1);
          let maxY = -1;
          response.forEach((point) => {
            if (point.y > maxY) {
              maxY = point.y;
            }
            this.lineChartData.datasets[0].data.push(point);
            this.shotHeight = maxY.toFixed(1);
          });
          this.chart?.update();
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
