import { defaultRouterLinkActiveOptions, INavigationMenu } from './ISidebar';

interface INavigations {
  admin: INavigationMenu[];
}

export const navigations: INavigations = {
  admin: [
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
