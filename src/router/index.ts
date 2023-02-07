
import { createWebHistory, createRouter } from 'vue-router';
import ProductList from "@/components/ProductList.vue";
import FormUser from "@/components/FormUser.vue";

const routes = [
  {
    path: "/",
    name: "ProductList",
    component: ProductList,
  },
  {
    path: "/form",
    name: "Form",
    component: FormUser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
