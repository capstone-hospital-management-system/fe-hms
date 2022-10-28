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
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';

import { BillsService } from '../services/bills.service';
import { IBillRequestDTO, IBillResponseDTO } from '../dtos/IBillsDTO';
import { billFields } from '../models/bills';
import { IPrescriptionResponseDTO } from 'src/app/prescriptions/dtos/IPrescriptionsDTO';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
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
  providers: [MessageService, ConfirmationService, BillsService],
})
export class BillsComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  billForm: FormGroup = new FormGroup({});
  isBillFormVisible: boolean = false;
  bills: IBillResponseDTO[] = [];
  prescriptionList: IPrescriptionResponseDTO[] = [];
  selectedBillId: number | undefined;
  isSubmitted: boolean = false;
  isSubmitLoading: boolean = false;
  isBillListLoading: boolean = false;
  isBillDetailLoading: boolean = false;
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
    private billsService: BillsService
  ) {}

  ngOnInit(): void {
    billFields.forEach(field => {
      const formControl = new FormControl('');
      if (field.isRequired) {
        formControl.addValidators(Validators.required);
      }
      if (field.regexPattern) {
        formControl.addValidators(Validators.pattern(field.regexPattern));
      }
      this.billForm.addControl(field.key, formControl);
    });

    let queryParams = {};
    this.activatedRoute.queryParams.subscribe(params => {
      queryParams = params;
    });
    this.onGetBills(queryParams);
  }

  onGetBills(params?: { [key: string]: string | number }): void {
    const queryParams = {
      page: params ? params['page'] : this.currentPage,
      size: params ? params['per_page'] : this.perPage,
    };
    this.isBillListLoading = true;
    this.billsService
      .get(queryParams)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.bills = res.data;
          this.totalData = res.meta?.total_data as number;
          this.isBillListLoading = false;
        },
        error: error => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Failed!',
            detail: error,
          });
          this.isBillListLoading = false;
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
    this.router.navigate(['/dashboard/bills'], { queryParams, replaceUrl: true });
    this.onGetBills(queryParams);
  }

  onToggleForm(): void {
    this.isBillFormVisible = !this.isBillFormVisible;
  }

  onHideForm(): void {
    this.billForm.reset();
    this.isSubmitted = false;
  }

  onAddPreview(): void {
    this.selectedBillId = undefined;
    this.onToggleForm();
    this.billForm.reset();
  }

  onEditPreview(bill: IBillResponseDTO): void {
    this.selectedBillId = bill.id;
    this.billForm.patchValue(bill);
    this.onToggleForm();
  }

  onDeletePreview(id: number) {
    this.selectedBillId = id;
    this.confirmationService.confirm({
      header: 'Delete Bill',
      message: 'Do you want to delete this bill? Bill will deleted permanently, so be careful',
      icon: 'pi pi-info-circle',
      defaultFocus: 'none',
      acceptIcon: '',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
      accept: () => {
        this.isDeleteLoading = true;
        this.billsService
          .delete(id)
          .pipe(takeUntil(this.ngUnsubsribe))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Bill Deleted!',
              });
              this.selectedBillId = undefined;
              this.onGetBills();
            },
            complete: () => {
              this.isDeleteLoading = false;
            },
          });
      },
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-primary p-button-sm',
      reject: () => {
        this.selectedBillId = undefined;
      },
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.billForm.invalid) return;
    this.isSubmitLoading = true;
    const payload: IBillRequestDTO = this.billForm.value;
    const submitService = this.selectedBillId
      ? this.billsService.update(this.selectedBillId, payload)
      : this.billsService.create(payload);
    submitService.pipe(takeUntil(this.ngUnsubsribe)).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.isSubmitLoading = false;
        this.billForm.reset();
        this.onToggleForm();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.selectedBillId ? 'Bill Updated!' : 'Bill Created!',
        });
        this.onGetBills();
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
