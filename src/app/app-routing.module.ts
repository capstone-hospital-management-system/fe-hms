import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './core/pages/error-page/error-page.component';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './core/layout/dashboard-layout/dashboard-layout.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'auth/login',
          pathMatch: 'full',
        },
        {
          path: 'auth',
          redirectTo: 'auth/login',
          pathMatch: 'full',
        },
        {
          path: 'auth',
          component: AuthLayoutComponent,
          children: [
            {
              path: 'login',
              title: 'Login',
              loadComponent: () => import('./auth/pages/login/login.component').then(m => m.LoginComponent),
            },
          ],
        },
        {
          path: 'dashboard',
          canLoad: [AuthGuard],
          canActivate: [AuthGuard],
          component: DashboardLayoutComponent,
          children: [
            {
              path: '',
              title: 'Homepage',
              loadComponent: () => import('./homepage/components/homepage.component').then(m => m.HomepageComponent),
            },
            {
              path: 'accounts',
              title: 'Accounts',
              loadComponent: () => import('./accounts/components/accounts.component').then(m => m.AccountsComponent),
            },
            {
              path: 'patients',
              title: 'Patients',
              loadComponent: () => import('./patients/components/patients.component').then(m => m.PatientsComponent),
            },
            {
              path: 'clinics',
              title: 'Clinics',
              loadComponent: () => import('./clinics/components/clinics.component').then(m => m.ClinicsComponent),
            },
            {
              path: 'medicines',
              title: 'Medicines',
              loadComponent: () => import('./medicines/components/medicines.component').then(m => m.MedicinesComponent),
            },
            {
              path: 'prescriptions',
              title: 'Prescriptions',
              loadComponent: () =>
                import('./prescriptions/components/prescriptions.component').then(m => m.PrescriptionsComponent),
            },
            {
              path: 'bills',
              title: 'Bills',
              loadComponent: () => import('./bills/components/bills.component').then(m => m.BillsComponent),
            },
          ],
        },
        { path: 'error-page', component: ErrorPageComponent },
        { path: '**', redirectTo: 'error-page' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
