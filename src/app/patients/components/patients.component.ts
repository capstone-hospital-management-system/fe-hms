import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
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

import { IPatientResponseDTO } from '../dtos/IPatientDTO';

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
  providers: [MessageService, ConfirmationService],
})
export class PatientsComponent implements OnInit {
  // private ngUnsubsribe: Subject<any> = new Subject();
  patientForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    id_card: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    age: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    gender: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    blood_type: new FormControl('', Validators.required),
    bod: new FormControl('', Validators.required),
    phone_number: new FormControl('', Validators.required),
    postal_code: new FormControl('', Validators.required),
    register_date: new FormControl(new Date(), Validators.required),
    register_by: new FormControl('', Validators.required),
    updated_by: new FormControl('', Validators.required),
  });
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
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    let queryParams = {};
    this.activatedRoute.queryParams.subscribe(params => {
      queryParams = params;
    });
    this.onGetPatients(queryParams);
  }

  onGetPatients(params?: { [key: string]: string | number }): void {
    // this.isPatientListLoading = true;
    // this.patientsService
    //   .httpGetPatients(params)
    //   .pipe(takeUntil(this.ngUnsubsribe))
    //   .subscribe(res => {
    //     this.patients = res.data;
    //     this.totalData = res.meta.total_data;
    //     this.isPatientListLoading = false;
    //   });
    // console.log(params);

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

  onExport(): void {
    // this.patientsService
    //   .httpGetPatientExcel()
    //   .pipe(takeUntil(this.ngUnsubsribe))
    //   .subscribe(blob => {
    //     saveAs(blob, 'patients.xlsx');
    //   });
  }

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
        // this.isDeleteLoading = true;
        // this.patientsService
        //   .httpDeletePatient(id)
        //   .pipe(takeUntil(this.ngUnsubsribe))
        //   .subscribe(() => {
        //     this.isDeleteLoading = false;
        //     this.messageService.add({
        //       severity: 'success',
        //       summary: 'Success',
        //       detail: 'Patient Deleted!',
        //     });
        //     this.selectedPatientId = undefined;
        //     this.onGetPatients();
        //   });
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
    console.log(this.patientForm.value);
    // if (this.patientForm.invalid) return;
    // this.isSubmitLoading = true;
    // const payload: IPatient = this.patientForm.value;
    // const httpSubmitService = this.selectedPatient
    //   ? this.patientsService.httpUpdatePatient(this.selectedPatient.id, payload)
    //   : this.patientsService.httpCreatePatient(payload);
    // httpSubmitService.pipe(takeUntil(this.ngUnsubsribe)).subscribe(() => {
    //   this.isSubmitted = false;
    //   this.isSubmitLoading = false;
    //   this.onToggleForm();
    //   this.patientForm.reset();
    //   this.messageService.add({
    //     severity: 'success',
    //     summary: 'Success',
    //     detail: this.selectedPatient ? 'Patient Updated!' : 'Patient Created!',
    //   });
    //   this.onGetPatients();
    // });
  }
}
