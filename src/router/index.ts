import { createWebHistory, createRouter } from 'vue-router';
import FormComment from "@/components/FormComment.vue";
import CoffeeShop from "@/components/CoffeeShop.vue"

const routes = [
  {
    path: "/",
    name: "CoffeeShop",
    component: CoffeeShop,
    props: true
  },
  {
    path: "/comment",
    name: "FormComment",
    component: FormComment,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
