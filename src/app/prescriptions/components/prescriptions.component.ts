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

import { PrescriptionsService } from '../services/prescriptions.service';
import { IPrescriptionRequestDTO, IPrescriptionResponseDTO } from '../dtos/IPrescriptionsDTO';
import { prescriptionFields } from '../models/prescriptions';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss'],
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
  providers: [MessageService, ConfirmationService, PrescriptionsService],
})
export class PrescriptionsComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  prescriptionForm: FormGroup = new FormGroup({});
  isPrescriptionFormVisible: boolean = false;
  prescriptions: IPrescriptionResponseDTO[] = [];
  selectedPrescriptionId: number | undefined;
  isSubmitted: boolean = false;
  isSubmitLoading: boolean = false;
  isPrescriptionListLoading: boolean = false;
  isPrescriptionDetailLoading: boolean = false;
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
    private prescriptionsService: PrescriptionsService
  ) {}

  ngOnInit(): void {
    prescriptionFields.forEach(field => {
      const formControl: FormControl = new FormControl('');
      if (field.isRequired) {
        formControl.addValidators(Validators.required);
      }
      if (field.regexPattern) {
        formControl.addValidators(Validators.pattern(field.regexPattern));
      }
      this.prescriptionForm.addControl(field.key, formControl);
    });

    let queryParams = {};
    this.activatedRoute.queryParams.subscribe(params => {
      queryParams = params;
    });
    this.onGetPrescriptions(queryParams);
  }

  onGetPrescriptions(params?: { [key: string]: string | number }): void {
    const queryParams = params ?? { page: this.currentPage, per_page: this.perPage };
    this.isPrescriptionListLoading = true;
    this.prescriptionsService
      .get(queryParams)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.prescriptions = res.data;
          this.totalData = res.meta?.total_data as number;
        },
        error: error => {
          console.error(error);
          this.isPrescriptionListLoading = false;
        },
      });

    // Hanya untuk testing
    this.prescriptions = [
      {
        id: 1,
        diagnose_id: 1,
        description: 'Diskripsi Resep',
        status: 'DONE',
        others: '',
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
    this.router.navigate(['/dashboard/prescriptions'], { queryParams, replaceUrl: true });
    this.onGetPrescriptions(queryParams);
  }

  onToggleForm(): void {
    this.isPrescriptionFormVisible = !this.isPrescriptionFormVisible;
  }

  onHideForm(): void {
    this.prescriptionForm.reset();
    this.isSubmitted = false;
  }

  onAddPreview(): void {
    this.onToggleForm();
    this.prescriptionForm.reset();
  }

  onEditPreview(prescription: IPrescriptionResponseDTO): void {
    this.selectedPrescriptionId = prescription.id;
    this.prescriptionForm.patchValue(prescription);
    this.onToggleForm();
  }

  onDeletePreview(id: number) {
    this.selectedPrescriptionId = id;
    this.confirmationService.confirm({
      header: 'Delete Prescription',
      message: 'Do you want to delete this prescription? Prescription will deleted permanently, so be careful',
      icon: 'pi pi-info-circle',
      defaultFocus: 'none',
      acceptIcon: '',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
      accept: () => {
        this.isDeleteLoading = true;
        this.prescriptionsService
          .delete(id)
          .pipe(takeUntil(this.ngUnsubsribe))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Prescription Deleted!',
              });
              this.selectedPrescriptionId = undefined;
              this.onGetPrescriptions();
            },
            complete: () => {
              this.isDeleteLoading = false;
            },
          });
      },
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-primary p-button-sm',
      reject: () => {
        this.selectedPrescriptionId = undefined;
      },
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.prescriptionForm.invalid) return;
    this.isSubmitLoading = true;
    const payload: IPrescriptionRequestDTO = this.prescriptionForm.value;
    const submitService = this.selectedPrescriptionId
      ? this.prescriptionsService.update(this.selectedPrescriptionId, payload)
      : this.prescriptionsService.create(payload);
    submitService.pipe(takeUntil(this.ngUnsubsribe)).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.onToggleForm();
        this.prescriptionForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.selectedPrescriptionId ? 'Prescription Updated!' : 'Prescription Created!',
        });
        this.onGetPrescriptions();
      },
      error: error => {
        console.error(error);
        this.isSubmitLoading = false;
      },
    });
  }
}