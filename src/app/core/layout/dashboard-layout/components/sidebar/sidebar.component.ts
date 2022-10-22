import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';

import { defaultRouterLinkActiveOptions, INavigationMenu } from './ISidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, DividerModule],
})
export class SidebarComponent {
  navigations: INavigationMenu[] = [
    {
      url: '/dashboard',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {},
      icon: 'pi pi-home',
      title: 'Homepage',
    },
    {
      url: '/dashboard/patients',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-users',
      title: 'Patients',
    },
    {
      url: '/dashboard/medicines',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-tags',
      title: 'Medicines',
    },
    {
      url: '/dashboard/prescriptions',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-book',
      title: 'Prescriptions',
    },
  ];

  constructor() {}
}
