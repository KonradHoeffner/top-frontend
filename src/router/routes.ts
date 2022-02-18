import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'root',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name: 'editor', path: '/:organisationId/:repositoryId/:entityId?', props: true, component: () => import('pages/Editor.vue') },
      { name: 'organisations', path: '/organisation', component: () => import('pages/OrganisationOverview.vue') },
      { name: 'showOrganisation', path: '/:organisationId', props: true, component: () => import('pages/Organisation.vue') }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
