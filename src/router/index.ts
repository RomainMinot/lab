import generatedRoutes from 'virtual:generated-pages';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/'),
  routes: generatedRoutes,
});

export default router;
