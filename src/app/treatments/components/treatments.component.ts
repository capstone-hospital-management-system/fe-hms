import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

import { IDiagnoseResponseDTO } from 'src/app/diagnoses/dtos/IDiagnosesDTO';
import { DiagnosesService } from 'src/app/diagnoses/services/diagnoses.service';
import { TreatmentsService } from '../services/treatments.service';
import { ITreatmentRequestDTO, ITreatmentResponseDTO } from '../dtos/ITreatmentsDTO';
import { treatmentFields } from '../models/treatments';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss'],
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
  ],
  providers: [MessageService, ConfirmationService, TreatmentsService, DiagnosesService, FormBuilder],
})
export class TreatmentsComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  treatmentForm: FormGroup = new FormGroup({});
  isTreatmentFormVisible: boolean = false;
  treatments: ITreatmentResponseDTO[] = [];
  diagnoseList: IDiagnoseResponseDTO[] = [];
  selectedDiagnose: IDiagnoseResponseDTO | undefined = undefined;
  selectedTreatmentId: number | undefined;
  isSubmitted: boolean = false;
  isSubmitLoading: boolean = false;
  isTreatmentListLoading: boolean = false;
  isTreatmentDetailLoading: boolean = false;
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
    private treatmentsService: TreatmentsService,
    private diagnosesService: DiagnosesService,
    private formBuilder: FormBuilder
  ) {
    this.treatmentForm = this.formBuilder.group({
      diagnose_id: ['', Validators.required],
      status: ['', Validators.required],
      report: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // treatmentFields.forEach(field => {
    //   const formControl: FormControl = new FormControl('');
    //   if (field.isRequired) {
    //     formControl.addValidators(Validators.required);
    //   }
    //   if (field.regexPattern) {
    //     formControl.addValidators(Validators.pattern(field.regexPattern));
    //   }
    //   this.treatmentForm.addControl(field.key, formControl);
    // });

    let queryParams = {};
    this.activatedRoute.queryParams.subscribe(params => {
      queryParams = params;
    });
    this.onGetTreatments(queryParams);
    this.onGetDiagnoses();
  }

  onGetTreatments(params?: { [key: string]: string | number }): void {
    const queryParams = {
      page: params ? params['page'] : this.currentPage,
      size: params ? params['per_page'] : this.perPage,
    };
    this.isTreatmentListLoading = true;
    this.treatmentsService
      .get(queryParams)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.treatments = res.data;
          this.totalData = res.meta?.total_data as number;
          this.isTreatmentListLoading = false;
        },
        error: error => {
          console.error(error);
          this.messageService.add({
            severity: 'error',
            summary: 'Failed!',
            detail: error,
          });
          this.isTreatmentListLoading = false;
        },
      });
  }

  onGetDiagnoses(params?: { [key: string]: string | number }): void {
    const queryParams = {
      search: params ? params['search'] : '',
    };
    this.diagnosesService
      .get(queryParams)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.diagnoseList = res.data;
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

  onChangePage(pagination: { page: number; first: number; rows: number; pageCount: number }): void {
    this.currentPage = pagination.page + 1;
    this.perPage = pagination.rows;
    let queryParams: { page: number; per_page: number } = {
      page: pagination.page + 1,
      per_page: pagination.rows,
    };
    this.router.navigate(['/dashboard/treatments'], { queryParams, replaceUrl: true });
    this.onGetTreatments(queryParams);
  }

  onToggleForm(): void {
    this.isTreatmentFormVisible = !this.isTreatmentFormVisible;
  }

  onHideForm(): void {
    this.treatmentForm.reset();
    this.isSubmitted = false;
    this.selectedDiagnose = undefined;
  }

  onAddPreview(): void {
    this.selectedTreatmentId = undefined;
    this.onToggleForm();
    this.treatmentForm.reset();
  }

  onEditPreview(treatment: ITreatmentResponseDTO): void {
    this.selectedTreatmentId = treatment.id;
    this.treatmentForm.patchValue({
      diagnose_id: treatment.diagnose.id,
      status: treatment.status,
      report: treatment.report,
    });
    this.onToggleForm();
  }

  onDeletePreview(id: number) {
    this.selectedTreatmentId = id;
    this.confirmationService.confirm({
      header: 'Delete Treatment',
      message: 'Do you want to delete this treatment? Treatment will deleted permanently, so be careful',
      icon: 'pi pi-info-circle',
      defaultFocus: 'none',
      acceptIcon: '',
      acceptLabel: 'Delete',
      acceptButtonStyleClass: 'p-button-outlined p-button-danger p-button-sm',
      accept: () => {
        this.isDeleteLoading = true;
        this.treatmentsService
          .delete(id)
          .pipe(takeUntil(this.ngUnsubsribe))
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Treatment Deleted!',
              });
              this.selectedTreatmentId = undefined;
              this.onGetTreatments();
            },
            complete: () => {
              this.isDeleteLoading = false;
            },
          });
      },
      rejectLabel: 'Cancel',
      rejectButtonStyleClass: 'p-button-primary p-button-sm',
      reject: () => {
        this.selectedTreatmentId = undefined;
      },
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (!this.selectedTreatmentId) this.treatmentForm.patchValue({ status: 'WAITING' });
    if (this.treatmentForm.invalid) return;
    this.isSubmitLoading = true;
    const payload: ITreatmentRequestDTO = this.treatmentForm.value;
    const submitService = this.selectedTreatmentId
      ? this.treatmentsService.update(this.selectedTreatmentId, payload)
      : this.treatmentsService.create(payload);
    submitService.pipe(takeUntil(this.ngUnsubsribe)).subscribe({
      next: () => {
        this.isSubmitted = false;
        this.isSubmitLoading = false;
        this.treatmentForm.reset();
        this.onToggleForm();
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: this.selectedTreatmentId ? 'Treatment Updated!' : 'Treatment Created!',
        });
        this.onGetTreatments();
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
