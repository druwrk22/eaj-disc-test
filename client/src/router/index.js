import { createRouter, createWebHistory } from 'vue-router';
import DiscTest from '../views/DiscTest.vue';
import HasilPage from '../views/HasilPage.vue';
import LoginPage from '../views/Auth/Login.vue';
import RegisterPage from '../views/Auth/Register.vue';

const routes = [
  { path: '/', name: 'DiscTest', component: DiscTest },
  { path: '/hasil', name: 'Hasil', component: HasilPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;