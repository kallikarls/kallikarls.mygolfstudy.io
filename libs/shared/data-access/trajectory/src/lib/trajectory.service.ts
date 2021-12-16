import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrajectoryService {
  constructor(private http: HttpClient) {}

  getTrajectory(
    ballSpeedMph: number,
    launchAngle: number,
    spinRate: number
  ): Observable<any[]> {
    return this.http.get<any[]>(
      `https://kallikarls-test.azurewebsites.net/api/Trajectory?ballSpeedMph=${ballSpeedMph}&launchAngle=${launchAngle}&spinRate=${spinRate}&distanceUnit=0`
    );
  }
}
