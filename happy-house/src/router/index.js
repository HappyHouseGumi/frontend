import Vue from "vue";
import VueRouter from "vue-router";
import AppMain from "@/views/AppMain.vue";
import AppQna from "@/views/AppQna.vue";
import QnaList from "@/components/qna/QnaList.vue";
import QnaRegist from "@/components/qna/QnaRegist.vue";
import QnaDetail from "@/components/qna/QnaDetail.vue";
import QnaModify from "@/components/qna/QnaModify.vue";
import AppUser from "@/views/AppUser.vue";
import UserJoin from "@/components/user/UserJoin.vue";
import UserLogin from "@/components/user/UserLogin.vue";
import UserMyPage from "@/components/user/UserMyPage.vue";

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
    redirect: "/qna/list",
    children: [
      {
        path: "list",
        name: "qnalist",
        component: QnaList,
      },
      {
        path: "regist",
        name: "qnaregist",
        component: QnaRegist,
      },
      {
        path: "detail/:id",
        name: "qnadetail",
        component: QnaDetail,
      },
      {
        path: "modify/:id",
        name: "qnamodify",
        component: QnaModify,
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: AppUser,
    children: [
      {
        path: "join",
        name: "userjoin",
        component: UserJoin,
      },
      // {
      //   path: "oauthjoin",
      //   name: "useroauthjoin",
      //   component: UserOauthJoin,
      // },
      {
        path: "login",
        name: "userlogin",
        component: UserLogin,
      },
      {
        path: "mypage",
        name: "usermypage",
        component: UserMyPage,
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
