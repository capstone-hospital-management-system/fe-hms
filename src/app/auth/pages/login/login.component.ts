import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { SessionService } from '../../services/session/session.service';
import { IAccountResponseDTO } from '../../dtos/IAuth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, InputTextModule, ToastModule],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  private ngUnsubsribe: Subject<any> = new Subject();
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  isSubmitted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (!Object.keys(params).length) return;
      this.loginForm.setValue({
        ...this.loginForm.value,
        username: params['email'],
      });
    });
  }

  onShowErrorLogin(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Failed Login!',
      detail: 'Invalid Credential, try again!',
    });
  }

  onShowSuccessLogin(selectedAdmin: IAccountResponseDTO): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Login Success!',
      detail: `Welcome, ${selectedAdmin.username}!`,
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;
    // this.isLoading = true;
    // this.authService
    //   .login(this.loginForm.value)
    //   .pipe(
    //     switchMap(res => {
    //       if (res) localStorage.setItem('access_token', res.data.access_token);
    //       return this.authService.accountInfo();
    //     }),
    //     takeUntil(this.ngUnsubsribe)
    //   )
    //   .subscribe({
    //     next: res => {
    //       this.sessionService.createSession(res.data);
    //       this.onShowSuccessLogin(res.data);
    //       setTimeout(() => {
    //         this.isSubmitted = false;
    //         this.isLoading = false;
    //         this.router.navigateByUrl('/dashboard');
    //       }, 1000);
    //     },
    //     error: () => {
    //       this.onShowErrorLogin();
    //     },
    //   });
  }
}
