<template>
  <div>
    <div class="mypage-wrapper">
      <span>회원 정보</span>
      <div><font-awesome-icon icon="fa-solid fa-user" class="fa-5x" /></div>
      <div class="mypage-contents-wrapper">
        <div class="mypage-content">
          <label>이메일</label>
          <input v-if="isModifyStatus" type="text" :placeholder="`${user.email}`" v-model="changedInfo.email" />
          <input v-else readonly type="text" :placeholder="`${user.email}`" />
        </div>
        <div class="mypage-content">
          <label>닉네임</label>
          <input v-if="isModifyStatus" type="text" :placeholder="`${user.nickName}`" v-model="changedInfo.nickName" />
          <input v-else readonly type="text" :placeholder="`${user.nickName}`" />
        </div>
        <div class="mypage-content">
          <label>비밀번호</label>
          <input
            v-if="isModifyStatus"
            type="password"
            :placeholder="`${user.password}`"
            v-model="changedInfo.password"
          />
          <input v-else readonly type="password" :placeholder="`${user.password}`" />
        </div>
        <div class="mypage-content">
          <label>거주지</label>
          <input v-if="isModifyStatus" type="text" :placeholder="`${user.location}`" v-model="changedInfo.location" />
          <input v-else readonly type="text" :placeholder="`${user.location}`" />
        </div>
      </div>
      <div v-if="!isModifyStatus" class="mypage-buttons-wrapper">
        <button style="background: #61affe" @click="moveModifyUser">수정</button>
        <button style="background: #f93e3e" @click="moveDeleteUser">탈퇴</button>
      </div>
      <div v-else class="mypage-buttons-wrapper">
        <button style="background: #49cc90" @click="modifyUserInfo">완료</button>
        <button style="background: #dddddd" @click="cancelModifyUser">취소</button>
      </div>
    </div>
  </div>
</template>

<script type="module">
import { deleteUser } from "@/api/user";
// modifyUser,

export default {
  name: "UserMyPage",
  data() {
    return {
      isModifyStatus: false,
      changedInfo: {
        email: "",
        nickName: "",
        password: "",
        location: "",
      },
      user: {},
    };
  },
  methods: {
    moveModifyUser() {
      this.isModifyStatus = !this.isModifyStatus;
    },
    cancelModifyUser() {
      this.isModifyStatus = !this.isModifyStatus;
    },
    modifyUserInfo() {},
    moveDeleteUser() {
      if (confirm("정말 탈퇴하시겠습니까?")) {
        deleteUser(
          this.user.id,
          ({ data }) => {
            if (data.flag === "success") {
              alert("정상적으로 탈퇴하였습니다.");
              this.$router.push("/");
            }
          },
          (error) => {
            console.log("회원 탈퇴 오류 : " + error);
          }
        );
      } else return;
    },
  },
  created() {
    // 회원 정보 불러오기
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
}

.mypage-wrapper {
  padding: 40px 0;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mypage-wrapper > span {
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 40px;
}

.mypage-contents-wrapper {
  display: flex;
  flex-direction: column;
  margin: 40px 0;
}

.mypage-content {
  width: 350px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.mypage-content > label {
  font-weight: bold;
  margin-right: 10px;
}

.mypage-content > input {
  width: 70%;
  height: 35px;
  border-radius: 10px;
  border: 1px solid darkgray;
  padding: 0 10px;
  outline: none;
  font-size: 0.9rem;
}

.mypage-buttons-wrapper {
  width: 280px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.mypage-buttons-wrapper > button {
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 10px 30px;
  color: white;
  border-radius: 10px;
}
</style>
