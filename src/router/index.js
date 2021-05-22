import Vue from "vue";
import VueRouter from "vue-router";
import BoardList from "../views/list.vue";
import BoardRead from "../views/read.vue";
import BoardWrite from "../views/write.vue";
import BoardModify from "../views/modify.vue";
import Board from "../views/board.vue";
import Test from "@/views/test.vue";
import AdminPage from "@/views/adminPage.vue";
//import AptInfo from "../views/AptInfo.vue";
import About from "../views/About.vue";
import userState from "@/components/userState.vue";

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
      {
        path:"modify",
        name:"boardModify",
        component:BoardModify,
      },
      
    ],
  },
  {
    path: "/about",
    name: "AptInfo",
    component: About,

    
  },
  {
    path:"/userState",
    name:"userState",
    component:userState,
  },
  {
    path:"/test",
    name:"test",
    component:Test,
  },
  {
    path:"/adminPage",
    name:"adminPage",
    component:AdminPage
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
