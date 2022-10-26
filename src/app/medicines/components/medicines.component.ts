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

import { MedicinesService } from '../services/medicines.service';
import { IMedicineRequestDTO, IMedicineResponseDTO } from '../dtos/IMedicinesDTO';
import { medicineFields } from '../models/medicines';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss'],
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
  providers: [MessageService, ConfirmationService, MedicinesService],
})
export class MedicinesComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  medicineForm: FormGroup = new FormGroup({});
  isMedicineFormVisible: boolean = false;
  medicines: IMedicineResponseDTO[] = [];
  selectedMedicineId: number | undefined;
  isSubmitted: boolean = false;
  isSubmitLoading: boolean = false;
  isMedicineListLoading: boolean = false;
  isMedicineDetailLoading: boolean = false;
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
    private medicinesService: MedicinesService
  ) {}

  ngOnInit(): void {
    medicineFields.forEach(field => {
      const formControl: FormControl = new FormControl('');
      if (field.isRequired) {
        formControl.addValidators(Validators.required);
      }
      if (field.regexPattern) {
        formControl.addValidators(Validators.pattern(field.regexPattern));
      }
      this.medicineForm.addControl(field.key, formControl);
    });

    let queryParams = {};
    this.activatedRoute.queryParams.subscribe(params => {
      queryParams = params;
    });
    this.onGetMedicines(queryParams);
  }

  onGetMedicines(params?: { [key: string]: string | number }): void {
    const queryParams = {
      page: params ? params['page'] : this.currentPage,
      size: params ? params['per_page'] : this.perPage,
    };
    this.isMedicineListLoading = true;
    this.medicinesService
      .get(queryParams)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.medicines = res.data;
          this.totalData = res.meta?.total_data as number;
          this.isMedicineListLoading = false;
        },
        error: error => {
          console.error(error);
          this.isMedicineListLoading = false;
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
    this.router.navigate(['/dashboard/medicines'], { queryParams, replaceUrl: true });
    this.onGetMedicines(queryParams);
  }

  onToggleForm(): void {
    this.isMedicineFormVisible = !this.isMedicineFormVisible;
  }

  onHideForm(): void {
    this.medicineForm.reset();
    this.isSubmitted = false;
  }

  onAddPreview(): void {
    this.selectedMedicineId = undefined;
    this.onToggleForm();
    this.medicineForm.reset();
  }

  onEditPreview(medicine: IMedicineResponseDTO): void {
    this.selectedMedicineId = medicine.id;
    this.medicineForm.patchValue(medicine);
    this.onToggleForm();
  }

  onDeletePreview(id: number) {
    this.selectedMedicineId = id;
    this.confirmationService.confirm({
      header: 'Delete Medicine',
      message: 'Do you want to delete this medicine? Medicine will deleted permanently, so be careful',
      icon: 'pi pi-info-circle',
      defaultFocus: 'none',
      acceptIcon: '',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
      accept: () => {
        this.isDeleteLoading = true;
        this.medicinesService
          .delete(id)
          .pipe(takeUntil(this.ngUnsubsribe))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Medicine Deleted!',
              });
              this.selectedMedicineId = undefined;
              this.onGetMedicines();
            },
            complete: () => {
              this.isDeleteLoading = false;
            },
          });
      },
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-primary p-button-sm',
      reject: () => {
        this.selectedMedicineId = undefined;
      },
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.medicineForm.invalid) return;
    this.isSubmitLoading = true;
    const payload: IMedicineRequestDTO = this.medicineForm.value;
    const submitService = this.selectedMedicineId
      ? this.medicinesService.update(this.selectedMedicineId, payload)
      : this.medicinesService.create(payload);
    submitService.pipe(takeUntil(this.ngUnsubsribe)).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.isSubmitLoading = false;
        this.medicineForm.reset();
        this.onToggleForm();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.selectedMedicineId ? 'Medicine Updated!' : 'Medicine Created!',
        });
        this.onGetMedicines();
      },
      error: error => {
        console.error(error);
        this.isSubmitLoading = false;
      },
    });
  }
}
