import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

// configure router
const router = new VueRouter({
  
  routes, // short for routes: routes
  linkActiveClass: 'active',
  scrollBehavior: (to, from ,savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    }
    if (to.hash) {
      return { selector: to.hash };
    }
    return { x: 0, y: 0 };
  }
});


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // no token found, redirect to login page.
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    } else {
      // token found, proceed to route
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
