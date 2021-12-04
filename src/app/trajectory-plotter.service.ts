import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Point} from "chart.js";

@Injectable({
  providedIn: 'root'
})
export class TrajectoryPlotterService {

  constructor(private http: HttpClient) { }

  getTrajectory(ballSpeedMph: number, launchAngle: number, spinRate: number) : Observable<Point[]> {

    return this.http.get<Point[]>(`https://kallikarls-test.azurewebsites.net/api/trajectory?ballSpeed=${ballSpeedMph}&launchAngle=${launchAngle}&spinRate=${spinRate}`);
  }

}
