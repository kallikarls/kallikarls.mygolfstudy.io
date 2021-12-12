import { HttpResponseBase } from '@angular/common/http';
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Chart, Point} from "chart.js";
import { TrajectoryPlotterService } from '../trajectory-plotter.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('chart')

  private chartRef!: ElementRef;
  private chart!: Chart;
  private data: Point[] = [];
  public shotLength: string = "0";
  public shotHeight: string = "0";

  ballLaunchInputForm = this.formBuilder.group({
    ballSpeedMph: '140',
    launchAngle: '13',
    spinRate: '2300'
  });

  constructor(private formBuilder: FormBuilder, private trajectoryPlotterService: TrajectoryPlotterService) { }

  onSubmit() : void {
    this.renderShot();
  }

  renderShot() {
    // Apply input parameters
    //console.warn('BallData', this.ballLaunchInputForm.value);
    console.log('Ball data', this.ballLaunchInputForm.controls.ballSpeedMph);

    this.data.length = 0;
    let result = this.trajectoryPlotterService.getTrajectory(
      Number(this.ballLaunchInputForm.controls.ballSpeedMph.value),
      Number(this.ballLaunchInputForm.controls.launchAngle.value),
      Number(this.ballLaunchInputForm.controls.spinRate.value))
      .subscribe((response) => {
        console.log("Received path data");
        if (response.length > 0) {
          this.shotLength = response[response.length-1].x.toFixed(1);
          var maxY = -1;
          response.forEach(point => {
            if (point.y > maxY) {
              maxY = point.y;
            }
            this.data.push(point);
            this.shotHeight = maxY.toFixed(1);
          });
        }        
        this.chart.update();
      }); 
  }

  ngAfterViewInit() {
    
    //this.data = [{x: 1, y: 20}, {x: 2, y: 15}, {x: 3, y: 10}, {x: 4, y: 12}, {x: 5, y: 6}];
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Ball flight',
          data: this.data,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
            xAxes: [{
                display: true,
                type: 'linear',
                position: 'bottom',
                ticks: {
                callback: function(value: any, index, values) {
                    return parseFloat(value).toFixed(0);
                },
                autoSkip: true,
                stepSize: 50,
                beginAtZero: true
                }
            }],
            yAxes: [{
                ticks: {
                    stepSize: 5,
                    precision: 0
                }
            }]
        }
    }
    });

    this.renderShot();
  }
  
}