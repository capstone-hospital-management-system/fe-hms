import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './core/pages/error-page/error-page.component';
import { AuthLayoutComponent } from './core/layout/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './core/layout/dashboard-layout/dashboard-layout.component';
import { Roles } from './accounts/models/role';

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
          data: {
            roles: [Roles.ADMINISTRATOR, Roles.RECEPTIONIST, Roles.DOCTOR, Roles.NURSE],
          },
          canLoad: [AuthGuard],
          canActivate: [AuthGuard],
          component: DashboardLayoutComponent,
          children: [
            {
              path: '',
              title: 'Homepage',
              data: {
                roles: [Roles.ADMINISTRATOR, Roles.RECEPTIONIST, Roles.DOCTOR, Roles.NURSE],
              },
              canLoad: [AuthGuard],
              canActivate: [AuthGuard],
              loadComponent: () => import('./homepage/components/homepage.component').then(m => m.HomepageComponent),
            },
            {
              path: 'accounts',
              title: 'Accounts',
              data: {
                roles: [Roles.ADMINISTRATOR],
              },
              canLoad: [AuthGuard],
              canActivate: [AuthGuard],
              loadComponent: () => import('./accounts/components/accounts.component').then(m => m.AccountsComponent),
            },
            {
              path: 'patients',
              title: 'Patients',
              data: {
                roles: [Roles.ADMINISTRATOR, Roles.RECEPTIONIST],
              },
              canLoad: [AuthGuard],
              canActivate: [AuthGuard],
              loadComponent: () => import('./patients/components/patients.component').then(m => m.PatientsComponent),
            },
            {
              path: 'clinics',
              title: 'Clinics',
              data: {
                roles: [Roles.ADMINISTRATOR, Roles.RECEPTIONIST, Roles.NURSE],
              },
              canLoad: [AuthGuard],
              canActivate: [AuthGuard],
              loadComponent: () => import('./clinics/components/clinics.component').then(m => m.ClinicsComponent),
            },
            {
              path: 'appointments',
              title: 'Appointments',
              data: {
                roles: [Roles.ADMINISTRATOR, Roles.RECEPTIONIST],
              },
              canLoad: [AuthGuard],
              canActivate: [AuthGuard],
              loadComponent: () =>
                import('./appointments/components/appointments.component').then(m => m.AppointmentsComponent),
            },
            {
              path: 'diagnoses',
              title: 'Diagnoses',
              data: {
                roles: [Roles.ADMINISTRATOR, Roles.DOCTOR],
              },
              canLoad: [AuthGuard],
              canActivate: [AuthGuard],
              loadComponent: () => import('./diagnoses/components/diagnoses.component').then(m => m.DiagnosesComponent),
            },
            {
              path: 'treatments',
              title: 'Treatments',
              data: {
                roles: [Roles.ADMINISTRATOR, Roles.DOCTOR, Roles.NURSE],
              },
              canLoad: [AuthGuard],
              canActivate: [AuthGuard],
              loadComponent: () =>
                import('./treatments/components/treatments.component').then(m => m.TreatmentsComponent),
            },
            {
              path: 'medicines',
              title: 'Medicines',
              data: {
                roles: [Roles.ADMINISTRATOR, Roles.DOCTOR, Roles.NURSE],
              },
              canLoad: [AuthGuard],
              canActivate: [AuthGuard],
              loadComponent: () => import('./medicines/components/medicines.component').then(m => m.MedicinesComponent),
            },
            {
              path: 'prescriptions',
              title: 'Prescriptions',
              data: {
                roles: [Roles.ADMINISTRATOR, Roles.DOCTOR, Roles.RECEPTIONIST],
              },
              canLoad: [AuthGuard],
              canActivate: [AuthGuard],
              loadComponent: () =>
                import('./prescriptions/components/prescriptions.component').then(m => m.PrescriptionsComponent),
            },
            {
              path: 'bills',
              title: 'Bills',
              data: {
                roles: [Roles.ADMINISTRATOR, Roles.RECEPTIONIST],
              },
              canLoad: [AuthGuard],
              canActivate: [AuthGuard],
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
