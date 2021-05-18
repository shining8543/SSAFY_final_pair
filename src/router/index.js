import Vue from "vue";
import VueRouter from "vue-router";
import BoardList from "../views/list.vue";
import BoardRead from "../views/read.vue";
import BoardWrite from "../views/write.vue";
import Board from "../views/board.vue";

Vue.use(VueRouter);

const routes = [

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
