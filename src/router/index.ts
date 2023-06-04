import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Dashboard from '../views/Dashboard.vue';
import AuthContainer from '../views/auth/AuthContainer.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import ProfileUpdate from '../views/auth/ProfileUpdate.vue';
import Parties from '../views/parties/Parties.vue';
import PartyDetails from '../views/parties/PartyDetails.vue';
import RegisterParty from '../views/parties/RegisterParty.vue';
import EditParty from '../views/parties/EditParty.vue';
import useAuthStore from '../stores/authStore';
import flashMessage from '@/stores/flashMessage';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/parties',
      name: 'parties',
      component: Parties
    },
    {
      path: '/parties/:id',
      name: 'party-details',
      component: PartyDetails
    },
    {
      path: '/parties/edit/:id',
      name: 'party-edit',
      component: EditParty,
      meta: { requiresAuth: true }
    },
    {
      path: '/parties/register',
      name: 'party-register',
      component: RegisterParty,
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthContainer,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        },
        {
          path: 'update',
          name: 'profile-update',
          component: ProfileUpdate,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
});

router.beforeEach((to, from) => {
  if(to.meta.requiresAuth && !useAuthStore().isAuthenticated) {
    flashMessage.setMessage('You have to login to access this page', 'alert-danger');
    return {
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router
