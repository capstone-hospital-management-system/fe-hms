import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DividerModule } from 'primeng/divider';

import { INavigationMenu } from './ISidebar';
import { navigations } from './sidebarNavigation';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, DividerModule],
})
export class SidebarComponent implements OnInit {
  navigations: INavigationMenu[] = [];

  constructor() {}

  ngOnInit(): void {
    this.navigations = navigations.admin;
  }
}
