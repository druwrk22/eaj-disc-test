import { createRouter, createWebHistory } from 'vue-router';
import DiscTest from '../views/DiscTest.vue';
import HasilPage from '../views/HasilPage.vue';
import LoginPage from '../views/Auth/Login.vue';
import RegisterPage from '../views/Auth/Register.vue';
import { requireAuth, requireGuest } from './guards';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  { 
    path: '/user', 
    name: 'DiscTest', 
    component: DiscTest,
    beforeEnter: requireAuth
  },
  { 
    path: '/hasil', 
    name: 'Hasil', 
    component: HasilPage,
    beforeEnter: requireAuth
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: LoginPage,
    beforeEnter: requireGuest
  },
  { 
    path: '/register', 
    name: 'Register', 
    component: RegisterPage,
    beforeEnter: requireGuest
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;