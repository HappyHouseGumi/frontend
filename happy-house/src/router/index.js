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
import UserOauthJoin from "@/components/user/UserOauthJoin.vue";
import AppBoard from "@/views/AppBoard.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardRegist from "@/components/board/BoardRegist.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";
import BoardModify from "@/components/board/BoardModify.vue";
import AppNotice from "@/views/AppNotice.vue";
import NoticeList from "@/components/notice/NoticeList.vue";
import NoticeRegist from "@/components/notice/NoticeRegist.vue";
import NoticeDetail from "@/components/notice/NoticeDetail.vue";
import NoticeModify from "@/components/notice/NoticeModify.vue";
import AppLike from "@/views/AppLike.vue";
import LikeList from "@/components/like/LikeList.vue";
import AppApt from "@/views/AppApt.vue";
import AptMap from "@/components/apt/AptMap.vue";

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
      {
        path: "oauthjoin",
        name: "useroauthjoin",
        component: UserOauthJoin,
      },
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
  {
    path: "/board",
    name: "board",
    component: AppBoard,
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "boardlist",
        component: BoardList,
      },
      {
        path: "regist",
        name: "boardregist",
        component: BoardRegist,
      },
      {
        path: "detail/:id",
        name: "boarddetail",
        component: BoardDetail,
      },
      {
        path: "modify/:id",
        name: "boardmodify",
        component: BoardModify,
      },
    ],
  },
  {
    path: "/notice",
    name: "notice",
    component: AppNotice,
    redirect: "/notice/list",
    children: [
      {
        path: "list",
        name: "noticelist",
        component: NoticeList,
      },
      {
        path: "regist",
        name: "noticeregist",
        component: NoticeRegist,
      },
      {
        path: "detail/:id",
        name: "noticedetail",
        component: NoticeDetail,
      },
      {
        path: "modify/:id",
        name: "noticemodify",
        component: NoticeModify,
      },
    ],
  },
  {
    path: "/like",
    name: "like",
    component: AppLike,
    redirect: "/like/list",
    children: [
      {
        path: "list",
        name: "likelist",
        component: LikeList,
      },
    ],
  },
  {
    path: "/apt",
    name: "apt",
    component: AppApt,
    redirect: "/apt/map",
    children: [
      {
        path: "map",
        name: "aptmap",
        component: AptMap,
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
