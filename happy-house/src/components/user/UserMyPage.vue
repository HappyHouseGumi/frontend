<template>
  <div>
    <div class="mypage-wrapper">
      <span>회원 정보</span>
      <div><font-awesome-icon icon="fa-solid fa-user" class="fa-5x" /></div>
      <div class="mypage-contents-wrapper">
        <div class="mypage-content">
          <label>이메일</label>
          <input readonly :placeholder="`${user.email}`" />
        </div>
        <div class="mypage-content">
          <label>닉네임</label>
          <input
            v-if="isModifyStatus"
            type="text"
            :placeholder="`${user.nickName}`"
            v-model="changedInfo.nickName"
            @keydown="checkAvailableNickName"
          />
          <input v-else readonly type="text" :placeholder="`${user.nickName}`" />
        </div>
        <span v-if="changedInfo.nickName && isAvailableNickName" class="check-nickname-span" style="color: #0069d9"
          ><i>사용할 수 있는 닉네임입니다.</i></span
        >
        <span
          v-else-if="changedInfo.nickName && !isAvailableNickName"
          class="check-nickname-span"
          style="color: #ff0000"
          ><i>사용할 수 없는 닉네임입니다.</i></span
        >
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
import { getUserDetail, modifyUser, deleteUser, getCheckNickName } from "@/api/user";

export default {
  name: "UserMyPage",
  data() {
    return {
      isAvailableNickName: false,
      isModifyStatus: false,
      changedInfo: {
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
    modifyUserInfo() {
      if (!this.isAvailableNickName && this.changedInfo.nickName !== "") {
        alert("닉네임 중복 검사를 해주세요.");
        return;
      }

      if (this.changedInfo.nickName === "") this.changedInfo.nickName = this.user.nickName;
      if (this.changedInfo.password === "") this.changedInfo.password = this.user.password;
      if (this.changedInfo.location === "") this.changedInfo.location = this.user.location;

      if (this.changedInfo.nickName > 6) {
        alert("닉네임은 최대 6자리 가능합니다.");
        return;
      }

      modifyUser(
        this.user.id,
        this.changedInfo,
        ({ data }) => {
          if (data.flag === "success") {
            this.$router.go();
          }
        },
        (error) => {
          console.log("회원 수정 오류 : " + error);
        }
      );
    },
    moveDeleteUser() {
      if (confirm("정말 탈퇴하시겠습니까?")) {
        deleteUser(
          this.user.id,
          ({ data }) => {
            if (data.flag === "success") {
              alert("정상적으로 탈퇴하였습니다.");
              localStorage.removeItem("loginUser");
              this.$router.push("/");
              this.$router.go();
            }
          },
          (error) => {
            console.log("회원 탈퇴 오류 : " + error);
          }
        );
      } else return;
    },
    checkAvailableNickName() {
      if (this.changedInfo.nickName !== "") {
        getCheckNickName(
          this.changedInfo.nickName,
          ({ data }) => {
            if (data.flag === "success") {
              this.isAvailableNickName = true;
            } else this.isAvailableNickName = false;
          },
          (error) => {
            console.log("닉네임 중복 검사 오류 : " + error);
          }
        );
      }
    },
  },
  created() {
    const id = JSON.parse(localStorage.getItem("loginUser")).userId;

    getUserDetail(
      id,
      ({ data }) => {
        if (data.flag === "success") {
          this.user = data.data[0];
        } else {
          alert("일치하는 회원이 없습니다.");
          this.$router.push("/user/login");
        }
      },
      (error) => {
        console.log("회원 상세 불러오기 중 에러 : " + error);
      }
    );
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
  align-items: center;
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

.check-nickname-span {
  font-size: 0.9rem;
  margin-bottom: 20px;
  font-weight: bold;
}
</style>
