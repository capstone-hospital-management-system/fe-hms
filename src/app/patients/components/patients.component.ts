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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';

import { IPatientRequestDTO, IPatientResponseDTO } from '../dtos/IPatientDTO';
import { PatientsService } from '../services/patients.service';
import { patientFields } from '../models/patient';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
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
    InputTextareaModule,
    CalendarModule,
  ],
  providers: [MessageService, ConfirmationService, PatientsService],
})
export class PatientsComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  patientForm: FormGroup = new FormGroup({});
  isPatientFormVisible: boolean = false;
  patients: IPatientResponseDTO[] = [];
  selectedPatientId: number | undefined;
  isSubmitted: boolean = false;
  isSubmitLoading: boolean = false;
  isPatientListLoading: boolean = false;
  isPatientDetailLoading: boolean = false;
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
    private patientsService: PatientsService
  ) {}

  ngOnInit(): void {
    patientFields.forEach(field => {
      const formControl: FormControl = new FormControl('');
      if (field.isRequired) {
        formControl.addValidators(Validators.required);
      }
      if (field.regexPattern) {
        formControl.addValidators(Validators.pattern(field.regexPattern));
      }
      this.patientForm.addControl(field.key, formControl);
    });

    let queryParams = {};
    this.activatedRoute.queryParams.subscribe(params => {
      queryParams = params;
    });
    this.onGetPatients(queryParams);
  }

  onGetPatients(params?: { [key: string]: string | number }): void {
    const queryParams = params ?? { page: this.currentPage, per_page: this.perPage };
    this.isPatientListLoading = true;
    this.patientsService
      .get(queryParams)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.patients = res.data;
          this.totalData = res.meta?.total_data as number;
        },
        error: error => {
          console.error(error);
          this.isPatientListLoading = false;
        },
      });

    // Hanya untuk testing
    this.patients = [
      {
        id: 1,
        username: 'Username',
        first_name: 'Firstname',
        last_name: 'Lastname',
        id_card: 333327346287364,
        age: 23,
        gender: 'MALE',
        address: 'Address Street',
        city: 'Ghost City',
        blood_type: 'B',
        bod: new Date(),
        phone_number: '087739999776',
        postal_code: 24456,
        register_date: new Date(),
        register_by: 1,
        updated_by: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];
  }

  onChangePage(pagination: { page: number; first: number; rows: number; pageCount: number }): void {
    this.currentPage = pagination.page + 1;
    this.perPage = pagination.rows;
    let queryParams: { page: number; per_page: number; sort?: string } = {
      page: pagination.page + 1,
      per_page: pagination.rows,
    };
    this.router.navigate(['/dashboard/patients'], { queryParams, replaceUrl: true });
    this.onGetPatients(queryParams);
  }

  onToggleForm(): void {
    this.isPatientFormVisible = !this.isPatientFormVisible;
  }

  onHideForm(): void {
    this.patientForm.reset();
    this.isSubmitted = false;
  }

  // onExport(): void {
  //   this.patientsService
  //     .httpGetPatientExcel()
  //     .pipe(takeUntil(this.ngUnsubsribe))
  //     .subscribe(blob => {
  //       saveAs(blob, 'patients.xlsx');
  //     });
  // }

  onAddPreview(): void {
    this.onToggleForm();
    this.patientForm.reset();
  }

  onEditPreview(patient: IPatientResponseDTO): void {
    this.selectedPatientId = patient.id;
    this.patientForm.patchValue(patient);
    this.onToggleForm();
  }

  onDeletePreview(id: number) {
    this.selectedPatientId = id;
    this.confirmationService.confirm({
      header: 'Delete Patient',
      message: 'Do you want to delete this patient? Patient will deleted permanently, so be careful',
      icon: 'pi pi-info-circle',
      defaultFocus: 'none',
      acceptIcon: '',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
      accept: () => {
        this.isDeleteLoading = true;
        this.patientsService
          .delete(id)
          .pipe(takeUntil(this.ngUnsubsribe))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Patient Deleted!',
              });
              this.selectedPatientId = undefined;
              this.onGetPatients();
            },
            complete: () => {
              this.isDeleteLoading = false;
            },
          });
      },
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-primary p-button-sm',
      reject: () => {
        this.selectedPatientId = undefined;
      },
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.patientForm.invalid) return;
    this.isSubmitLoading = true;
    const payload: IPatientRequestDTO = this.patientForm.value;
    const submitService = this.selectedPatientId
      ? this.patientsService.update(this.selectedPatientId, payload)
      : this.patientsService.create(payload);
    submitService.pipe(takeUntil(this.ngUnsubsribe)).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.onToggleForm();
        this.patientForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.selectedPatientId ? 'Patient Updated!' : 'Patient Created!',
        });
        this.onGetPatients();
      },
      complete: () => {
        this.isSubmitLoading = false;
      },
    });
  }
}
