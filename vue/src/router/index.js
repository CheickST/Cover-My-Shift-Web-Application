import { createRouter as createRouter, createWebHistory } from 'vue-router'
import { useStore } from 'vuex'

// Import components
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import LogoutView from '../views/LogoutView.vue';
import RegisterView from '../views/RegisterView.vue';
import EmployeeView from '../views/EmployeeView.vue';
import RequestTimeOffView from '../views/RequestTimeOffView.vue';
import PickUpShiftView from '../views/PickUpShiftView.vue';
import ShiftDetailView from '../views/ShiftDetailView.vue';
import ManagerView from '../views/ManagerView.vue'
import MyShiftView from '../views/MyShiftView.vue'
import PendingRequestsView from '../views/PendingRequestsView.vue'
import PendingCoverRequestsView from '../views/PendingCoverRequestsView.vue'
import ManagerAllShiftsView from '../views/ManagerAllShiftsView.vue'
import ShiftCalendarView from '../views/ShiftCalendarView.vue'
import ManagerCoverageView from '../views/ManagerCoverageView.vue'


/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/employee",
    name: "employee",
    component: EmployeeView,
    meta: {
      requiresAuth: true,
      role:'ROLE_EMPLOYEE',

    }
  },
  {
    path: "/timeoff",
    name: "timeoff",
    component: RequestTimeOffView,
    meta: {
      requiresAuth: true,
      role:'ROLE_EMPLOYEE',
    }
  },
  {
    path: "/pickupshift",
    name: "pickupshift",
    component: PickUpShiftView,
    meta: {
      requiresAuth:  true,
      role:'ROLE_EMPLOYEE',
    }
  },
  {
    path: "/shiftdetails/:id",
    name: "shiftdetails",
    component: ShiftDetailView,
    meta: {
      requiresAuth:  true,
      role:'ROLE_EMPLOYEE',
    }
  },
  {
    path:'/manager',
    name:'manager',
    component: ManagerView,
    meta: {
      requiresAuth: true,
      role:'ROLE_MANAGER',
    }
  },
  {
    path: '/myshift',
    name: 'myshift',
    component: MyShiftView,
    meta: {
      requiresAuth: true,
      role:'ROLE_EMPLOYEE',
    }
  },
  {
    path: '/pendingrequests',
    name: 'pendingrequests',
    component: PendingRequestsView,
    meta: {
      requiresAuth: true,
      role: 'ROLE_MANAGER',
    }
  },
  {
    path: '/shift/:shiftId/cover',
    name: 'pendingCoverRequests',
    component: PendingCoverRequestsView,
    meta: {
      requiresAuth: true,
      role: 'ROLE_MANAGER',
    }
  },
  {
    path: '/allShifts',
    name: 'allShifts',
    component: ManagerAllShiftsView,
    meta: {
      requiresAuth: true,
      role: 'ROLE_MANAGER',
    }
  },
  {
    path: '/shiftCalendar',
    name: 'shiftCalendar',
    component: ShiftCalendarView,
    meta:{
      requiresAuth: false,
      
    }
  },
  {
    path: '/coverage',
    name: 'coverage',
    component: ManagerCoverageView,
    meta: {
      requiresAuth: true,
      role: 'ROLE_MANAGER',
    }
  }
  
];

// Create the router
const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach((to) => {

  // Get the Vuex store
  const store = useStore();

  //const userRole = store.getters.userRole;

  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    return {name: "login"};
  }
  // Otherwise, do nothing and they'll go to their next destination

  //const routeRole = to.meta.role;
  // if (routeRole && userRole !== routeRole) {
  //   return { name: 'home' }; // Redirect to home or an access denied page
  // }

});

export default router;
