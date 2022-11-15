import Vue from "vue";
import VueRouter from "vue-router";
import AppMain from "@/views/AppMain.vue";
import AppQna from "@/views/AppQna.vue";
import QnaRegist from "@/components/qna/QnaRegist.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: AppMain,
  },
  {
    path: "/qna",
    name: "qna",
    component: AppQna,
    children: [
      {
        path: "/regist",
        name: "qnaregist",
        component: QnaRegist,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
