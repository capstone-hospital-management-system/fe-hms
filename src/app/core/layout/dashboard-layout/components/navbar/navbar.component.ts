import { Component, DoCheck, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BadgeModule } from 'primeng/badge';

import { SessionService } from 'src/app/auth/services/session/session.service';
import { AccountsService } from 'src/app/accounts/services/accounts.service';
import { WebsocketService } from 'src/app/core/services/websocket/websocket.service';
import { IAccountResponseDTO } from 'src/app/accounts/dtos/IAccountsDTO';
import { IAccountInfo } from 'src/app/auth/dtos/IAuth';
import { INotification } from 'src/app/core/dtos/INotificationsDTO';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbModule,
    OverlayPanelModule,
    ButtonModule,
    AvatarModule,
    DialogModule,
    ProgressSpinnerModule,
    BadgeModule,
  ],
  providers: [MessageService, SessionService, AccountsService, WebsocketService],
})
export class NavbarComponent implements OnInit, DoCheck {
  private ngUnsubsribe: Subject<any> = new Subject();
  breadcrumbHome!: MenuItem;
  breadcrumbItems: MenuItem[] = [];
  myProfile: IAccountResponseDTO | undefined = undefined;
  isProfileVisible: boolean = false;
  isProfileLoading: boolean = false;
  notifications: INotification[] = [];

  constructor(
    private title: Title,
    private router: Router,
    private messageService: MessageService,
    private sessionService: SessionService,
    private accountsService: AccountsService,
    private websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.breadcrumbHome = { label: 'Dashboard', routerLink: '/dashboard' };
    this.websocketService.subscribeNotification('/topic/messages', (event: any): any => {
      const wsBody = JSON.parse(event.body);
      console.log(wsBody);
      this.notifications.unshift(wsBody);
    });
  }

  ngDoCheck(): void {
    this.breadcrumbItems = [{ label: this.title.getTitle(), disabled: true }];
  }

  getCredential(): IAccountInfo {
    return this.sessionService.getSession();
  }

  onGetProfile(): void {
    this.isProfileLoading = true;
    this.accountsService
      .getById(this.getCredential().id)
      .pipe(takeUntil(this.ngUnsubsribe))
      .subscribe({
        next: res => {
          this.myProfile = res.data;
          this.isProfileLoading = false;
        },
        error: error => {
          console.error(error);
          this.isProfileLoading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Failed!',
            detail: error,
          });
        },
      });
  }

  onToggleProfileModal(): void {
    this.isProfileVisible = !this.isProfileVisible;
    if (this.isProfileVisible) {
      this.onGetProfile();
    }
  }

  onMarkAsRead(): void {
    this.notifications = [];
  }

  onLogout(): void {
    this.sessionService.destroySession();
    this.router.navigateByUrl('/auth/login');
  }
}
