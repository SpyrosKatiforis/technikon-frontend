import { Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { PropertyOwnerHomeComponent } from './property-owner-home/property-owner-home.component';
import { PropertyOwnerPropertiesComponent } from './property-owner-properties/property-owner-properties.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin-register', component: AdminHomeComponent },
  { path: 'property-owner-register', component: PropertyOwnerHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'property-owner-dashboard', component: PropertyOwnerPropertiesComponent }, // New route
  { path: '**', redirectTo: '' }
];