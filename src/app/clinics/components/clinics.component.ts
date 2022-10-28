import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

import { ClinicsService } from '../services/clinics.service';
import { IClinicRequestDTO, IClinicResponseDTO } from '../dtos/IClinicsDTO';
import { clinicFields } from '../models/clinics';

@Component({
  selector: 'app-clinics',
  templateUrl: './clinics.component.html',
  styleUrls: ['./clinics.component.scss'],
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
  providers: [MessageService, ConfirmationService, ClinicsService],
})
export class ClinicsComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  clinicForm: FormGroup = new FormGroup({});
  isClinicFormVisible: boolean = false;
  clinics: IClinicResponseDTO[] = [];
  selectedClinicId: number | undefined;
  isSubmitted: boolean = false;
  isSubmitLoading: boolean = false;
  isClinicListLoading: boolean = false;
  isClinicDetailLoading: boolean = false;
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
    private clinicsService: ClinicsService
  ) {}

  ngOnInit(): void {
    clinicFields.forEach(field => {
      const formControl: FormControl = new FormControl('');
      if (field.isRequired) {
        formControl.addValidators(Validators.required);
      }
      if (field.regexPattern) {
        formControl.addValidators(Validators.pattern(field.regexPattern));
      }
      this.clinicForm.addControl(field.key, formControl);
    });

    let queryParams = {};
    this.activatedRoute.queryParams.subscribe(params => {
      queryParams = params;
    });
    this.onGetClinics(queryParams);
  }

  onGetClinics(params?: { [key: string]: string | number }): void {
    const queryParams = {
      page: params ? params['page'] : this.currentPage,
      size: params ? params['per_page'] : this.perPage,
    };
    this.isClinicListLoading = true;
    this.clinicsService
      .get(queryParams)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.clinics = res.data;
          this.totalData = res.meta?.total_data as number;
          this.isClinicListLoading = false;
        },
        error: error => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Failed!',
            detail: error,
          });
          this.isClinicListLoading = false;
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
    this.router.navigate(['/dashboard/clinics'], { queryParams, replaceUrl: true });
    this.onGetClinics(queryParams);
  }

  onToggleForm(): void {
    this.isClinicFormVisible = !this.isClinicFormVisible;
  }

  onHideForm(): void {
    this.clinicForm.reset();
    this.isSubmitted = false;
  }

  onAddPreview(): void {
    this.selectedClinicId = undefined;
    this.onToggleForm();
    this.clinicForm.reset();
  }

  onEditPreview(clinic: IClinicResponseDTO): void {
    this.selectedClinicId = clinic.id;
    this.clinicForm.patchValue(clinic);
    this.onToggleForm();
  }

  onDeletePreview(id: number) {
    this.selectedClinicId = id;
    this.confirmationService.confirm({
      header: 'Delete Clinic',
      message: 'Do you want to delete this clinic? Clinic will deleted permanently, so be careful',
      icon: 'pi pi-info-circle',
      defaultFocus: 'none',
      acceptIcon: '',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
      accept: () => {
        this.isDeleteLoading = true;
        this.clinicsService
          .delete(id)
          .pipe(takeUntil(this.ngUnsubsribe))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Clinic Deleted!',
              });
              this.selectedClinicId = undefined;
              this.onGetClinics();
            },
            complete: () => {
              this.isDeleteLoading = false;
            },
          });
      },
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-primary p-button-sm',
      reject: () => {
        this.selectedClinicId = undefined;
      },
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.clinicForm.invalid) return;
    this.isSubmitLoading = true;
    const payload: IClinicRequestDTO = this.clinicForm.value;
    const submitService = this.selectedClinicId
      ? this.clinicsService.update(this.selectedClinicId, payload)
      : this.clinicsService.create(payload);
    submitService.pipe(takeUntil(this.ngUnsubsribe)).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.isSubmitLoading = false;
        this.clinicForm.reset();
        this.onToggleForm();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.selectedClinicId ? 'Clinic Updated!' : 'Clinic Created!',
        });
        this.onGetClinics();
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
