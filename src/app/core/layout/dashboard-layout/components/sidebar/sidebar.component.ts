import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';

import { IAccountInfo } from 'src/app/auth/dtos/IAuth';
import { SessionService } from 'src/app/auth/services/session/session.service';
import { INavigationMenu } from './ISidebar';
import { INavigations, navigations } from './sidebarNavigation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, DividerModule],
  providers: [SessionService],
})
export class SidebarComponent implements OnInit {
  navigations: INavigationMenu[] = [];

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    if (!this.getCredential()) return;
    const role = this.getCredential().authorities[0].authority.toLowerCase();
    this.navigations = navigations[role as keyof INavigations];
  }

  getCredential(): IAccountInfo {
    return this.sessionService.getSession();
  }
}
