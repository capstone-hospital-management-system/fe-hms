import { defaultRouterLinkActiveOptions, INavigationMenu } from './ISidebar';

export interface INavigations {
  administrator: INavigationMenu[];
  doctor: INavigationMenu[];
  nurse: INavigationMenu[];
  receptionist: INavigationMenu[];
}

export const navigations: INavigations = {
  administrator: [
    {
      url: '/dashboard',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {},
      icon: 'pi pi-home',
      title: 'Homepage',
    },
    {
      url: '/dashboard/accounts',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-verified',
      title: 'Accounts',
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
      url: '/dashboard/clinics',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-building',
      title: 'Clinics',
    },
    {
      url: '/dashboard/appointments',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-calendar-plus',
      title: 'Appointments',
    },
    {
      url: '/dashboard/diagnoses',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-flag-fill',
      title: 'Diagnoses',
    },
    {
      url: '/dashboard/treatments',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-flag',
      title: 'Treatments',
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
    {
      url: '/dashboard/bills',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-copy',
      title: 'Bills',
    },
  ],
  doctor: [
    {
      url: '/dashboard',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {},
      icon: 'pi pi-home',
      title: 'Homepage',
    },
    {
      url: '/dashboard/diagnoses',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-flag-fill',
      title: 'Diagnoses',
    },
    {
      url: '/dashboard/treatments',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-flag',
      title: 'Treatments',
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
  ],
  nurse: [
    {
      url: '/dashboard',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {},
      icon: 'pi pi-home',
      title: 'Homepage',
    },
    {
      url: '/dashboard/clinics',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-building',
      title: 'Clinics',
    },
    {
      url: '/dashboard/treatments',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-flag',
      title: 'Treatments',
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
  ],
  receptionist: [
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
      url: '/dashboard/appointments',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-calendar-plus',
      title: 'Appointments',
    },
    {
      url: '/dashboard/clinics',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-building',
      title: 'Clinics',
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
    {
      url: '/dashboard/bills',
      routerLinkActiveOptions: defaultRouterLinkActiveOptions,
      queryParams: {
        page: 1,
        per_page: 5,
      },
      icon: 'pi pi-copy',
      title: 'Bills',
    },
  ],
};

// {
//   admin: all,
//   doctor: [
//     diagnose (crud),
//     prescription (crud),
//     treatments (crud),
//   ],
//   nurse: [
//     clinics (crud),
//     treatments (crud),
//     medicines (crud),
//   ],
//   receptionist: [
//     patients (crud),
//     clinics (crud),
//     appointment (crud),
//     prescription (crud),
//     bills (crud),
//   ],
// }
