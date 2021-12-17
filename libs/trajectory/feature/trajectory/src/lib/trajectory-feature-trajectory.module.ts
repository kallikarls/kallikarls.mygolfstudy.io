import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { TrajectoryPage } from './trajectory.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TrajectoryPage }]),
    ReactiveFormsModule,
    NgChartsModule,
    FlexLayoutModule,
    MatSliderModule,
  ],
  declarations: [TrajectoryPage],
})
export class TrajectoryFeatureTrajectoryModule {}
