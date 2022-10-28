import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  standalone: true,
  imports: [CommonModule, CardModule],
  providers: [],
})
export class HomepageComponent {
  statistics: any[] = [
    {
      icon: 'pi pi-verified',
      label: 'Available Staff',
      count: 12345,
    },
    {
      icon: 'pi pi-users',
      label: 'Patients',
      count: 12345,
    },
    {
      icon: 'pi pi-building',
      label: 'Clinics',
      count: 12345,
    },
    {
      icon: 'pi pi-flag-fill',
      label: 'Diagnoses',
      count: 12345,
    },
    {
      icon: 'pi pi-flag',
      label: 'Treatments',
      count: 12345,
    },
    {
      icon: 'pi pi-tags',
      label: 'Medicines',
      count: 12345,
    },
    {
      icon: 'pi pi-book',
      label: 'Prescriptions',
      count: 12345,
    },
    {
      icon: 'pi pi-copy',
      label: 'Total Bills',
      count: 12345,
    },
  ];

  constructor() {}
}
