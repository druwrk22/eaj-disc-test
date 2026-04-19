import { createRouter, createWebHistory } from 'vue-router';
import DiscTest from '../views/DiscTest.vue';
import ChangePassword from '../views/ChangePassword.vue';
import HasilPage from '../views/HasilPage.vue';
import LoginPage from '../views/Auth/Login.vue';
import RegisterPage from '../views/Auth/Register.vue';
import MasterPage from '../views/Master/Home.vue';
import ManageUserPage from '../views/Master/ManageUser.vue';
import ManageQuestionPage from '../views/Master/ManageQuestion.vue';
import { requireAuth, requireGuest } from './guards';

const routes = [
  {
    path: '/',
    redirect: '/login'
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
  },
  { 
    path: '/user', 
    name: 'DiscTest', 
    component: DiscTest,
    beforeEnter: requireAuth
  },
  { 
    path: '/user/change-password', 
    name: 'ChangePassword', 
    component: ChangePassword,
    beforeEnter: requireAuth
  },
  { 
    path: '/hasil', 
    name: 'Hasil', 
    component: HasilPage,
    beforeEnter: requireAuth
  },
  { 
    path: '/master', 
    name: 'Master', 
    component: MasterPage,
    beforeEnter: requireAuth
  },
  { 
    path: '/master/manage-user', 
    name: 'Manage User', 
    component: ManageUserPage,
    beforeEnter: requireAuth
  },
  { 
    path: '/master/manage-question', 
    name: 'Manage Question', 
    component: ManageQuestionPage,
    beforeEnter: requireAuth
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;