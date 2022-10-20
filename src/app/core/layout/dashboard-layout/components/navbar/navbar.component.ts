import { Component, DoCheck, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { SessionService } from 'src/app/auth/services/session/session.service';

// Hanya untuk sample
interface IAdmin {
  id: number;
  username: string;
  email: string;
  phone: string;
  idCard: string;
  name: string;
  address: string;
  password?: string;
  created_at: number;
  updated_at: number;
}

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
  ],
})
export class NavbarComponent implements OnInit, DoCheck {
  // private ngUnsubscribe: Subject<any> = new Subject();
  breadcrumbHome!: MenuItem;
  breadcrumbItems: MenuItem[] = [];
  selectedAdmin: IAdmin | undefined;
  isAdminLoading: boolean = false;
  isProfileVisible: boolean = false;

  constructor(private title: Title, private router: Router, private sessionService: SessionService) {}

  ngOnInit(): void {
    this.breadcrumbHome = { label: 'Dashboard', routerLink: '/dashboard' };
    this.selectedAdmin = {
      id: 1,
      username: 'username',
      email: 'email@email.com',
      phone: '087739999776',
      idCard: '333789183486242',
      name: 'Full Name',
      address: 'Address Street',
      password: 'password',
      created_at: 1666256299516,
      updated_at: 1666256299516,
    };
  }

  ngDoCheck(): void {
    this.breadcrumbItems = [{ label: this.title.getTitle(), disabled: true }];
  }

  onToggleProfileModal(): void {
    // const adminInfo = localStorage.getItem('admin_info') ?? null;

    // if (!adminInfo) return;

    this.isProfileVisible = !this.isProfileVisible;

    // if (this.isProfileVisible) {
    //   const parseAdminInfo = JSON.parse(adminInfo) as IAdmin;

    //   this.isAdminLoading = true;

    //   this.adminsService
    //     .httpGetAdminDetail(parseAdminInfo.id)
    //     .pipe(takeUntil(this.ngUnsubscribe))
    //     .subscribe(res => {
    //       const { id_card: idCard, ...rest } = res.data;
    //       this.selectedAdmin = { ...rest, idCard };
    //       this.isAdminLoading = false;
    //     });
    // }
  }

  getCredential(): { initialName: string; name: string } {
    const currentSession = this.sessionService.getSession();

    if (!currentSession) return { initialName: 'U', name: 'unknown user' };

    const credentialData = {
      initialName: currentSession.name.charAt(0).toUpperCase(),
      name: currentSession.name,
    };
    return credentialData;
  }

  onLogout(): void {
    this.sessionService.destroySession();
    this.router.navigateByUrl('/auth/login');
  }
}
