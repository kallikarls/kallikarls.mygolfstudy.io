import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { TrajectoryPage } from './trajectory.page';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TrajectoryPage }]),
    ReactiveFormsModule,
    NgChartsModule,
  ],
  declarations: [TrajectoryPage],
})
export class TrajectoryFeatureTrajectoryModule {}
