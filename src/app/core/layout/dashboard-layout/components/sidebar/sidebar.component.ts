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
    // {
    //   url: '/dashboard/transactions',
    //   routerLinkActiveOptions: defaultRouterLinkActiveOptions,
    //   queryParams: {
    //     page: 1,
    //     per_page: 5,
    //   },
    //   icon: 'pi pi-chart-bar',
    //   title: 'Transactions',
    // },
    // {
    //   url: '/dashboard/admins',
    //   routerLinkActiveOptions: defaultRouterLinkActiveOptions,
    //   queryParams: {
    //     page: 1,
    //     per_page: 5,
    //   },
    //   icon: 'pi pi-users',
    //   title: 'Admins',
    // },
  ];

  constructor() {}
}
