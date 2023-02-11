import { createWebHistory, createRouter } from 'vue-router';
import ProductList from "@/components/ProductList.vue";
import FormDelivery from "@/components/FormDelivery.vue";
import FormComment from "@/components/FormComment.vue";

const routes = [
  {
    path: "/",
    name: "ProductList",
    component: ProductList,
    props: true
  },
  {
    path: "/form",
    name: "FormDelivery",
    component: FormDelivery,
    props: true,
    // params: {order: routes.params.order}
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
