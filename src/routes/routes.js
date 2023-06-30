import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/carreras',
        name: 'carreras',
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "demo" */ '../views/carreras/Carreras.vue')
      },
      {
        path: '/tipos',
        name: 'tipos',
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "demo" */ '../views/tipos/tipos.vue')
      },
      {
        path: '/usuarios',
        name: 'usuarios',
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "demo" */ '../views/usuarios/usuarios.vue')
      },
      {
        path: '/status',
        name: 'status',
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "demo" */ '../views/status/status.vue')
      },
      {
        path: '/lotes',
        name: 'lotes',
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "demo" */ '../views/lotes/lotes.vue')
      },
      {
        path: '/solicitudes',
        name: 'solicitudes',
        
        component: () => import(/* webpackChunkName: "demo" */ '../views/solicitudes/solicitudes.vue')
      },
      {
        path: '/icons',
        name: 'icons',
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: '/maps',
        name: 'maps',
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        meta: {
          requiresAuth: true
        },
        component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;
