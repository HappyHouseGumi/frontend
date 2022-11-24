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
import AppInterest from "@/views/AppInterest.vue";
import AppChart from "@/views/AppChart.vue";
import ChartRanking from "@/components/chart/ChartRanking.vue";
import ChartStatistics from "@/components/chart/ChartStatistics.vue";
import { getIsUserAdmin } from "@/api/user";

Vue.use(VueRouter);

// 로그인 유저인지 확인
const isLoginStatus = (to, from, next) => {
  const loginUser = localStorage.getItem("loginUser");

  if (loginUser) next();
  else {
    alert("로그인이 필요한 서비스입니다.");
    router.push("/user/login");
  }
};

// 관리자인지 확인
const isAdmin = (to, from, next) => {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  let userId = "";

  if (loginUser) userId = loginUser.userId;

  if (userId) {
    getIsUserAdmin(
      userId,
      ({ data }) => {
        if (data.flag === "success") {
          next();
        } else {
          alert("관리자만 접근할 수 있습니다.");
          router.push("/");
        }
      },
      (error) => {
        console.log("관리자 확인 오류 : " + error);
      }
    );
  }
};

// 비정상적인 접근
const abnormalAccess = (to, from, next) => {
  const flag = false;

  if (flag) next();
  else {
    alert("비정상적인 접근입니다.");
    router.push("/");
  }
};

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
        beforeEnter: abnormalAccess,
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
        beforeEnter: abnormalAccess,
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
        beforeEnter: isLoginStatus,
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
        beforeEnter: isLoginStatus,
        component: BoardRegist,
      },
      {
        path: "detail/:id/:pass",
        name: "boarddetail",
        beforeEnter: isLoginStatus,
        component: BoardDetail,
      },
      {
        path: "modify/:id",
        name: "boardmodify",
        beforeEnter: abnormalAccess,
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
        beforeEnter: isAdmin,
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
        beforeEnter: isAdmin,
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
        beforeEnter: isLoginStatus,
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
  {
    path: "/interest",
    name: "interest",
    component: AppInterest,
    beforeEnter: isLoginStatus,
  },
  {
    path: "/chart",
    name: "chart",
    component: AppChart,
    redirect: "/chart/ranking",
    children: [
      {
        path: "ranking",
        name: "chartRanking",
        component: ChartRanking,
      },
      {
        path: "statistics",
        name: "chartStatistics",
        component: ChartStatistics,
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
