import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PropertyOwnerHomeComponent } from './property-owner-home/property-owner-home.component';

export const appRoutes: Routes = [
  { path: 'admin', component: AdminHomeComponent },
  { path: 'property-owner', component: PropertyOwnerHomeComponent },
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: '**', redirectTo: '/admin' }
];