import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';

import { DiagnosesService } from '../services/diagnoses.service';
import { IMedicineResponseDTO } from 'src/app/medicines/dtos/IMedicinesDTO';
import { AppointmentsService } from 'src/app/appointments/services/appointments.service';
import { IAppointmentResponseDTO } from 'src/app/appointments/dtos/IAppointmentsDTO';
import { IDiagnoseRequestDTO, IDiagnoseResponseDTO } from '../dtos/IDiagnosesDTO';
import { diagnoseFields } from '../models/diagnoses';

@Component({
  selector: 'app-diagnoses',
  templateUrl: './diagnoses.component.html',
  styleUrls: ['./diagnoses.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    TableModule,
    SkeletonModule,
    ButtonModule,
    PaginatorModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    CalendarModule,
    RadioButtonModule,
    DropdownModule,
  ],
  providers: [MessageService, ConfirmationService, DiagnosesService, AppointmentsService],
})
export class DiagnosesComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  diagnoseForm: FormGroup = new FormGroup({});
  isDiagnoseFormVisible: boolean = false;
  diagnoses: IDiagnoseResponseDTO[] = [];
  appointmentList: IAppointmentResponseDTO[] = [];
  selectedAppointment: IAppointmentResponseDTO | undefined = undefined;
  medicineList: IMedicineResponseDTO[] = [];
  selectedDiagnoseId: number | undefined;
  isSubmitted: boolean = false;
  isSubmitLoading: boolean = false;
  isDiagnoseListLoading: boolean = false;
  isDiagnoseDetailLoading: boolean = false;
  isDeleteLoading: boolean = false;

  currentPage: number = 1;
  perPage: number = 5;
  totalPage: number = 1;
  totalData: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private diagnosesService: DiagnosesService,
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit(): void {
    diagnoseFields.forEach(field => {
      if (field.key === 'medicine_ids') {
        const formArray = new FormArray([], Validators.required);
        this.diagnoseForm.addControl(field.key, formArray);
      } else {
        const formControl = new FormControl('');
        if (field.isRequired) {
          formControl.addValidators(Validators.required);
        }
        if (field.regexPattern) {
          formControl.addValidators(Validators.pattern(field.regexPattern));
        }
        this.diagnoseForm.addControl(field.key, formControl);
      }
    });

    let queryParams = {};
    this.activatedRoute.queryParams.subscribe(params => {
      queryParams = params;
    });
    this.onGetDiagnoses(queryParams);
    this.onGetAppointments();
  }

  onGetDiagnoses(params?: { [key: string]: string | number }): void {
    const queryParams = {
      page: params ? params['page'] : this.currentPage,
      size: params ? params['per_page'] : this.perPage,
    };
    this.isDiagnoseListLoading = true;
    this.diagnosesService
      .get(queryParams)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.diagnoses = res.data;
          this.totalData = res.meta?.total_data as number;
          this.isDiagnoseListLoading = false;
        },
        error: error => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Failed!',
            detail: error,
          });
          this.isDiagnoseListLoading = false;
        },
      });
  }

  onGetAppointments(params?: { [key: string]: string | number }): void {
    const queryParams = {
      search: params ? params['search'] : '',
    };
    this.appointmentsService
      .get(queryParams)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.appointmentList = res.data;
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

  onAppointmentChange(event: any): void {
    const findAppointment = this.appointmentList.find(appointment => appointment.id === event.value);
    this.selectedAppointment = findAppointment;
  }

  get medicineIds() {
    return this.diagnoseForm.get('medicine_ids') as FormArray;
  }

  onAddMedicine(): void {
    this.medicineIds.push(new FormControl('', Validators.required));
  }

  onRemoveMedicine(index: number): void {
    this.medicineIds.removeAt(index);
  }

  onChangePage(pagination: { page: number; first: number; rows: number; pageCount: number }): void {
    this.currentPage = pagination.page + 1;
    this.perPage = pagination.rows;
    let queryParams: { page: number; per_page: number } = {
      page: pagination.page + 1,
      per_page: pagination.rows,
    };
    this.router.navigate(['/dashboard/diagnoses'], { queryParams, replaceUrl: true });
    this.onGetDiagnoses(queryParams);
  }

  onToggleForm(): void {
    this.isDiagnoseFormVisible = !this.isDiagnoseFormVisible;
  }

  onHideForm(): void {
    this.diagnoseForm.reset();
    this.isSubmitted = false;
  }

  onAddPreview(): void {
    this.selectedDiagnoseId = undefined;
    this.onToggleForm();
    this.diagnoseForm.reset();
  }

  onEditPreview(diagnose: IDiagnoseResponseDTO): void {
    this.selectedDiagnoseId = diagnose.id;
    this.selectedAppointment = diagnose.appointment;
    this.diagnoseForm.patchValue({
      name: diagnose.name,
      appointment_id: diagnose.appointment.id,
      description: diagnose.description,
      report: diagnose.report,
    });
    this.onToggleForm();
  }

  onDeletePreview(id: number) {
    this.selectedDiagnoseId = id;
    this.confirmationService.confirm({
      header: 'Delete Diagnose',
      message: 'Do you want to delete this diagnose? Diagnose will deleted permanently, so be careful',
      icon: 'pi pi-info-circle',
      defaultFocus: 'none',
      acceptIcon: '',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
      accept: () => {
        this.isDeleteLoading = true;
        this.diagnosesService
          .delete(id)
          .pipe(takeUntil(this.ngUnsubsribe))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Diagnose Deleted!',
              });
              this.selectedDiagnoseId = undefined;
              this.onGetDiagnoses();
            },
            complete: () => {
              this.isDeleteLoading = false;
            },
          });
      },
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-primary p-button-sm',
      reject: () => {
        this.selectedDiagnoseId = undefined;
      },
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.diagnoseForm.invalid) return;
    this.diagnoseForm.patchValue({ status: 'WAITING_PAYMENT' });
    this.isSubmitLoading = true;
    const payload: IDiagnoseRequestDTO = this.diagnoseForm.value;
    const submitService = this.selectedDiagnoseId
      ? this.diagnosesService.update(this.selectedDiagnoseId, payload)
      : this.diagnosesService.create(payload);
    submitService.pipe(takeUntil(this.ngUnsubsribe)).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.isSubmitLoading = false;
        this.diagnoseForm.reset();
        this.onToggleForm();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.selectedDiagnoseId ? 'Diagnose Updated!' : 'Diagnose Created!',
        });
        this.onGetDiagnoses();
      },
      error: error => {
        console.error(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Failed!',
          detail: error,
        });
        this.isSubmitLoading = false;
      },
    });
  }
}
