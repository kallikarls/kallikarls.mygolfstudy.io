import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () =>
          import('@mgs/trajectory/feature/trajectory').then(
            (m) => m.TrajectoryFeatureTrajectoryModule
          ),
      },
    ]),
  ],
})
export class TrajectoryFeatureShellModule {}
