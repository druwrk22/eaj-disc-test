import { createRouter, createWebHistory } from 'vue-router';
import DiscTest from '../views/DiscTest.vue';
import HasilPage from '../views/HasilPage.vue';

const routes = [
  { path: '/', name: 'DiscTest', component: DiscTest },
  { path: '/hasil', name: 'Hasil', component: HasilPage }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;