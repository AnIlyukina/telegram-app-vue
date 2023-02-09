import { createWebHistory, createRouter } from 'vue-router';
import ProductList from "@/components/ProductList.vue";
import FormUser from "@/components/FormDelivery.vue";
import FormComment from "@/components/FormComment.vue";

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
