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
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';

import { IAccountRequestDTO, IAccountResponseDTO } from '../dtos/IAccountsDTO';
import { AccountsService } from '../services/accounts.service';
import { accountFields } from '../models/accounts';
import { Roles } from '../models/role';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
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
  providers: [MessageService, ConfirmationService, AccountsService],
})
export class AccountsComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  accountForm: FormGroup = new FormGroup({});
  isAccountFormVisible: boolean = false;
  accounts: IAccountResponseDTO[] = [];
  selectedAccountId: number | undefined;
  isSubmitted: boolean = false;
  isSubmitLoading: boolean = false;
  isAccountListLoading: boolean = false;
  isAccountDetailLoading: boolean = false;
  isDeleteLoading: boolean = false;
  roles: Roles[] = [];

  currentPage: number = 1;
  perPage: number = 5;
  totalPage: number = 1;
  totalData: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private accountsService: AccountsService
  ) {}

  ngOnInit(): void {
    accountFields.forEach(field => {
      const formControl: FormControl = new FormControl('');
      if (field.isRequired) {
        formControl.addValidators(Validators.required);
      }
      if (field.regexPattern) {
        formControl.addValidators(Validators.pattern(field.regexPattern));
      }
      this.accountForm.addControl(field.key, formControl);
    });

    let queryParams = {};
    this.activatedRoute.queryParams.subscribe(params => {
      queryParams = params;
    });
    this.onGetAccounts(queryParams);
    this.roles = Object.values(Roles);
  }

  onGetAccounts(params?: { [key: string]: string | number }): void {
    const queryParams = {
      page: params ? params['page'] : this.currentPage,
      size: params ? params['per_page'] : this.perPage,
    };
    this.isAccountListLoading = true;
    this.accountsService
      .get(queryParams)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.accounts = res.data;
          this.totalData = res.meta?.total_data as number;
          this.isAccountListLoading = false;
        },
        error: error => {
          console.error(error);
          this.isAccountListLoading = false;
        },
      });
  }

  onChangePage(pagination: { page: number; first: number; rows: number; pageCount: number }): void {
    this.currentPage = pagination.page + 1;
    this.perPage = pagination.rows;
    let queryParams: { page: number; per_page: number; sort?: string } = {
      page: pagination.page + 1,
      per_page: pagination.rows,
    };
    this.router.navigate(['/dashboard/accounts'], { queryParams, replaceUrl: true });
    this.onGetAccounts(queryParams);
  }

  onToggleForm(): void {
    this.isAccountFormVisible = !this.isAccountFormVisible;
  }

  onHideForm(): void {
    this.accountForm.reset();
    this.isSubmitted = false;
  }

  onAddPreview(): void {
    this.selectedAccountId = undefined;
    this.onToggleForm();
    this.accountForm.reset();
  }

  onEditPreview(account: IAccountResponseDTO): void {
    this.selectedAccountId = account.id;
    this.accountForm.patchValue(account);
    this.onToggleForm();
  }

  onDeletePreview(id: number) {
    this.selectedAccountId = id;
    this.confirmationService.confirm({
      header: 'Delete Account',
      message: 'Do you want to delete this patient? Account will deleted permanently, so be careful',
      icon: 'pi pi-info-circle',
      defaultFocus: 'none',
      acceptIcon: '',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
      accept: () => {
        this.isDeleteLoading = true;
        this.accountsService
          .delete(id)
          .pipe(takeUntil(this.ngUnsubsribe))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Account Deleted!',
              });
              this.selectedAccountId = undefined;
              this.onGetAccounts();
            },
            complete: () => {
              this.isDeleteLoading = false;
            },
          });
      },
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-primary p-button-sm',
      reject: () => {
        this.selectedAccountId = undefined;
      },
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.accountForm.invalid) return;
    this.isSubmitLoading = true;
    const payload: IAccountRequestDTO = this.accountForm.value;
    const submitService = this.selectedAccountId
      ? this.accountsService.update(this.selectedAccountId, payload)
      : this.accountsService.create(payload);
    submitService.pipe(takeUntil(this.ngUnsubsribe)).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.isSubmitLoading = false;
        this.onToggleForm();
        this.accountForm.reset();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.selectedAccountId ? 'Account Updated!' : 'Account Created!',
        });
        this.onGetAccounts();
      },
      error: error => {
        console.error(error);
        this.isSubmitLoading = false;
      },
    });
  }
}
