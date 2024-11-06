import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import Quiz from '../components/Quiz.vue';

const routes = [
  { path: '/', redirect: '/dashboard', },
  { path: '/dashboard', component: Dashboard },
  { path: '/quiz/:quizSelected', component: Quiz },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
