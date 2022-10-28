import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
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

import { AppointmentsService } from '../services/appointments.service';
import { IAppointmentRequestDTO, IAppointmentResponseDTO } from '../dtos/IAppointmentsDTO';
import { appointmentFields } from '../models/appointments';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
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
  ],
  providers: [MessageService, ConfirmationService, AppointmentsService],
})
export class AppointmentsComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  appointmentForm: FormGroup = new FormGroup({});
  isAppointmentFormVisible: boolean = false;
  appointments: IAppointmentResponseDTO[] = [];
  clinicList: any[] = [];
  selectedAppointmentId: number | undefined;
  isSubmitted: boolean = false;
  isSubmitLoading: boolean = false;
  isAppointmentListLoading: boolean = false;
  isAppointmentDetailLoading: boolean = false;
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
    private appointmentsService: AppointmentsService
  ) {}

  ngOnInit(): void {
    appointmentFields.forEach(field => {
      const formControl: FormControl = new FormControl('');
      if (field.isRequired) {
        formControl.addValidators(Validators.required);
      }
      if (field.regexPattern) {
        formControl.addValidators(Validators.pattern(field.regexPattern));
      }
      this.appointmentForm.addControl(field.key, formControl);
    });

    let queryParams = {};
    this.activatedRoute.queryParams.subscribe(params => {
      queryParams = params;
    });
    this.onGetAppointments(queryParams);
  }

  onGetAppointments(params?: { [key: string]: string | number }): void {
    const queryParams = {
      page: params ? params['page'] : this.currentPage,
      size: params ? params['per_page'] : this.perPage,
    };
    this.isAppointmentListLoading = true;
    this.appointmentsService
      .get(queryParams)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.appointments = res.data;
          this.totalData = res.meta?.total_data as number;
          this.isAppointmentListLoading = false;
        },
        error: error => {
          console.error(error);
          this.isAppointmentListLoading = false;
        },
      });
  }

  onChangePage(pagination: { page: number; first: number; rows: number; pageCount: number }): void {
    this.currentPage = pagination.page + 1;
    this.perPage = pagination.rows;
    let queryParams: { page: number; per_page: number } = {
      page: pagination.page + 1,
      per_page: pagination.rows,
    };
    this.router.navigate(['/dashboard/appointments'], { queryParams, replaceUrl: true });
    this.onGetAppointments(queryParams);
  }

  onToggleForm(): void {
    this.isAppointmentFormVisible = !this.isAppointmentFormVisible;
  }

  onHideForm(): void {
    this.appointmentForm.reset();
    this.isSubmitted = false;
  }

  onAddPreview(): void {
    this.selectedAppointmentId = undefined;
    this.onToggleForm();
    this.appointmentForm.reset();
  }

  onEditPreview(appointment: IAppointmentResponseDTO): void {
    this.selectedAppointmentId = appointment.id;
    this.appointmentForm.patchValue(appointment);
    this.onToggleForm();
  }

  onDeletePreview(id: number) {
    this.selectedAppointmentId = id;
    this.confirmationService.confirm({
      header: 'Delete Appointment',
      message: 'Do you want to delete this appointment? Appointment will deleted permanently, so be careful',
      icon: 'pi pi-info-circle',
      defaultFocus: 'none',
      acceptIcon: '',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
      accept: () => {
        this.isDeleteLoading = true;
        this.appointmentsService
          .delete(id)
          .pipe(takeUntil(this.ngUnsubsribe))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Appointment Deleted!',
              });
              this.selectedAppointmentId = undefined;
              this.onGetAppointments();
            },
            complete: () => {
              this.isDeleteLoading = false;
            },
          });
      },
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-primary p-button-sm',
      reject: () => {
        this.selectedAppointmentId = undefined;
      },
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.appointmentForm.invalid) return;
    this.isSubmitLoading = true;
    const payload: IAppointmentRequestDTO = this.appointmentForm.value;
    const appointmentDate = new Date(payload.appointment_date);
    payload.appointment_date = formatDate(appointmentDate, 'yyyy-MM-dd HH:mm:dd', 'en-US');
    const submitService = this.selectedAppointmentId
      ? this.appointmentsService.update(this.selectedAppointmentId, payload)
      : this.appointmentsService.create(payload);
    submitService.pipe(takeUntil(this.ngUnsubsribe)).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.isSubmitLoading = false;
        this.appointmentForm.reset();
        this.onToggleForm();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.selectedAppointmentId ? 'Appointment Updated!' : 'Appointment Created!',
        });
        this.onGetAppointments();
      },
      error: error => {
        console.error(error);
        this.isSubmitLoading = false;
      },
    });
  }
}