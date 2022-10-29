import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { SessionService } from '../../services/session/session.service';
import { IAccountInfo } from '../../dtos/IAuth';

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
    username_or_email: new FormControl('', Validators.required),
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

    if (this.sessionService.getAccessToken()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onShowErrorLogin(): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Failed!',
      detail: 'Invalid Credential!',
    });
  }

  onShowSuccessLogin(selectedAdmin: IAccountInfo): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Login Success!',
      detail: `Welcome, ${selectedAdmin.username}!`,
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.authService
      .authenticate(this.loginForm.value)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          if (res) localStorage.setItem('access_token', res.data.access_token);
          this.sessionService.createSession(res.data.account_info);
          this.onShowSuccessLogin(res.data.account_info);
          setTimeout(() => {
            this.isSubmitted = false;
            this.isLoading = false;
            this.router.navigateByUrl('/dashboard');
          }, 1000);
        },
        error: () => {
          this.isSubmitted = false;
          this.isLoading = false;
          this.onShowErrorLogin();
        },
      });
  }
}
