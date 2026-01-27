import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
// 👇 Import et
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: JobListComponent },
  // 👇 Yeni yol
  { path: 'dashboard', component: DashboardComponent },
];