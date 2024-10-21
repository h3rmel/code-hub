import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import JobsView from "@/views/JobsView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import JobView from "@/views/JobView.vue";
import AddJobView from "@/views/AddJobView.vue";
import EditJobView from "@/views/EditJobView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Home | Vue Jobs",
      },
    },
    {
      path: "/jobs",
      name: "jobs",
      component: JobsView,
      meta: {
        title: "Jobs | Vue Jobs",
      },
    },
    {
      path: "/jobs/:id",
      name: "job",
      component: JobView,
      meta: {
        title: "Jobs | Vue Jobs",
      },
    },
    {
      path: "/jobs/add",
      name: "add job",
      component: AddJobView,
      meta: {
        title: "Add Job | Vue Jobs",
      },
    },
    {
      path: "/jobs/edit/:id",
      name: "edit job",
      component: EditJobView,
      meta: {
        title: "Edit Job | Vue Jobs",
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: NotFoundView,
      meta: {
        title: "Not Found | Vue Jobs",
      },
    },
  ],
});

router.beforeEach((to) => {
  const meta = to.meta;

  document.title = String(meta.title) || 'Vue Jobs';
})

export { router };
