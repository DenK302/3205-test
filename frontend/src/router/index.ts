import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import SearchForm from '@/components/SearchForm.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: SearchForm,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;