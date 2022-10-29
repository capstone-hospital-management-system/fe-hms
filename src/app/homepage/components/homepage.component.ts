import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { Subject, takeUntil } from 'rxjs';

import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { AppointmentsService } from 'src/app/appointments/services/appointments.service';
import { BillsService } from 'src/app/bills/services/bills.service';
import { ClinicsService } from 'src/app/clinics/services/clinics.service';
import { DiagnosesService } from 'src/app/diagnoses/services/diagnoses.service';
import { MedicinesService } from 'src/app/medicines/services/medicines.service';
import { PatientsService } from 'src/app/patients/services/patients.service';
import { PrescriptionsService } from 'src/app/prescriptions/services/prescriptions.service';
import { TreatmentsService } from 'src/app/treatments/services/treatments.service';
import { IStatistic } from '../dtos/IHomepage';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: true,
  imports: [CommonModule, CardModule, ToastModule],
  providers: [
    AccountsService,
    PatientsService,
    ClinicsService,
    AppointmentsService,
    DiagnosesService,
    TreatmentsService,
    MedicinesService,
    PrescriptionsService,
    BillsService,
    MessageService,
  ],
})
export class HomepageComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  statistics: IStatistic[] = [
    {
      icon: 'pi pi-verified',
      label: 'Available Staff',
      count: 0,
    },
    {
      icon: 'pi pi-users',
      label: 'Patients',
      count: 0,
    },
    {
      icon: 'pi pi-building',
      label: 'Clinics',
      count: 0,
    },
    {
      icon: 'pi pi-calendar-plus',
      label: 'Appointments',
      count: 0,
    },
    {
      icon: 'pi pi-flag-fill',
      label: 'Diagnoses',
      count: 0,
    },
    {
      icon: 'pi pi-flag',
      label: 'Treatments',
      count: 0,
    },
    {
      icon: 'pi pi-tags',
      label: 'Medicines',
      count: 0,
    },
    {
      icon: 'pi pi-book',
      label: 'Prescriptions',
      count: 0,
    },
    {
      icon: 'pi pi-copy',
      label: 'Total Bills',
      count: 0,
    },
  ];

  constructor(
    private accountsService: AccountsService,
    private patientsService: PatientsService,
    private clinicsService: ClinicsService,
    private appointmentsService: AppointmentsService,
    private diagnosesService: DiagnosesService,
    private treatmentsService: TreatmentsService,
    private medicinesService: MedicinesService,
    private prescriptionsService: PrescriptionsService,
    private billsService: BillsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.onGetAccounts();
    this.onGetPatients();
    this.onGetClinics();
    this.onGetAppointments();
    this.onGetDiagnoses();
    this.onGetTreatments();
    this.onGetMedicines();
    this.onGetPrescriptions();
    this.onGetBills();
  }

  onGetAccounts(): void {
    this.accountsService
      .get()
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.statistics[0].count = res.meta?.total_data as number;
        },
        error: error => {
          console.error(error);
        },
      });
  }

  onGetPatients(): void {
    this.patientsService
      .get()
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.statistics[1].count = res.meta?.total_data as number;
        },
        error: error => {
          console.error(error);
        },
      });
  }

  onGetClinics(): void {
    this.clinicsService
      .get()
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.statistics[2].count = res.meta?.total_data as number;
        },
        error: error => {
          console.error(error);
        },
      });
  }

  onGetAppointments(): void {
    this.appointmentsService
      .get()
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.statistics[3].count = res.meta?.total_data as number;
        },
        error: error => {
          console.error(error);
        },
      });
  }

  onGetDiagnoses(): void {
    this.diagnosesService
      .get()
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.statistics[4].count = res.meta?.total_data as number;
        },
        error: error => {
          console.error(error);
        },
      });
  }

  onGetTreatments(): void {
    this.treatmentsService
      .get()
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.statistics[5].count = res.meta?.total_data as number;
        },
        error: error => {
          console.error(error);
        },
      });
  }

  onGetMedicines(): void {
    this.medicinesService
      .get()
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.statistics[6].count = res.meta?.total_data as number;
        },
        error: error => {
          console.error(error);
        },
      });
  }

  onGetPrescriptions(): void {
    this.prescriptionsService
      .get()
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.statistics[7].count = res.meta?.total_data as number;
        },
        error: error => {
          console.error(error);
        },
      });
  }

  onGetBills(): void {
    this.billsService
      .get()
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.statistics[8].count = res.meta?.total_data as number;
        },
        error: error => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Failed!',
            detail: error,
          });
        },
      });
  }
}
