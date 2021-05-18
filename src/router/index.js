import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import BoardList from "../views/board/list.vue";
import BoardRead from "../views/board/read.vue";
import BoardWrite from "../views/board/write.vue";
import Board from "../views/board/board.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/board",
    name: "Board",
    component: Board,
    redirect:"board/list",
    children:[
      {
      path:"list",
      name:"boardlist",
      component:BoardList,
      },
      {
        path:"write",
        name:"boardWrite",
        component:BoardWrite,
      },
      {
        path:"read",
        name:"boardRead",
        component:BoardRead,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
