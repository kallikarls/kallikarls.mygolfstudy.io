import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

const routes: Routes = [
  { path: 'welcome', component: NxWelcomeComponent },
  { redirectTo: '/welcome', path: '', pathMatch: 'full' },
  {
    path: 'trajectory',
    loadChildren: () =>
      import('@mgs/trajectory/feature/shell').then(
        (m) => m.TrajectoryFeatureShellModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
