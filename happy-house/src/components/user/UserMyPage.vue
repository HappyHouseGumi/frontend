<template>
  <div class="user-mypage-wrapper">
    <div>
      <div class="mypage-wrapper">
        <span>회원 정보</span>
        <div><font-awesome-icon icon="fa-solid fa-user" class="fa-5x" /></div>
        <div class="mypage-contents-wrapper">
          <div class="mypage-content">
            <label>이메일</label>
            <input readonly :placeholder="`${user.email}`" />
          </div>
          <div v-if="!isModifyStatus" class="mypage-content">
            <label>닉네임</label>
            <input readonly type="text" :placeholder="`${user.nickName}`" />
          </div>
          <div v-if="isModifyStatus" class="mypage-content mypage-nickname">
            <label>닉네임</label>
            <input v-if="isModifyStatus" type="text" :placeholder="`${user.nickName}`" v-model="changedInfo.nickName" />
            <button @click="checkAvailableNickName">중복 체크</button>
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
          <div class="mypage-content" v-if="isModifyStatus">
            <label>거주지</label>
            <div class="mypage-location-wrapper">
              <select v-model="selectedSido" @change="changeSido">
                <option v-for="(list, index) in optionSido" :key="index" :value="list.dongCode">
                  {{ list.sidoName }}
                </option>
              </select>
              <select v-if="isSidoSelected" v-model="selectedGugun">
                <option v-for="(list, index) in optionGugun" :key="index" :value="list.dongCode">
                  {{ list.gugunName }}
                </option>
              </select>
            </div>
          </div>
          <div class="mypage-content" v-else>
            <label>거주지</label>
            <input readonly type="text" :placeholder="`${user.location}`" />
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
  </div>
</template>

<script type="module">
import { getUserDetail, modifyUser, deleteUser, getCheckNickName } from "@/api/user";
import { getDongCode } from "@/api/apt";

export default {
  name: "UserMyPage",
  data() {
    return {
      isAvailableNickName: false,
      isModifyStatus: false,
      hasUserLocation: false,
      selectedSido: 0,
      selectedGugun: 0,
      optionSido: [],
      optionGugun: [],
      isSidoSelected: false,
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

      if (this.selectedGugun === 0) {
        alert("거주지를 다시 확인해주세요.");
        return;
      } else {
        this.changedInfo.location = this.selectedGugun;
      }

      if (this.changedInfo.nickName === "") this.changedInfo.nickName = this.user.nickName;
      if (this.changedInfo.password === "") this.changedInfo.password = this.user.password;
      if (this.changedInfo.location === "") this.changedInfo.location = this.user.location;

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
      if (this.changedInfo.nickName.length > 6) {
        alert("닉네임은 최대 6자리까지 가능합니다.");
        return;
      }

      if (this.changedInfo.nickName !== "") {
        getCheckNickName(
          this.changedInfo.nickName,
          ({ data }) => {
            if (data.flag === "success") {
              this.isAvailableNickName = true;
              alert("사용할 수 있는 닉네임입니다.");
            } else {
              this.isAvailableNickName = false;
              alert("사용할 수 없는 닉네임입니다.");
            }
          },
          (error) => {
            console.log("닉네임 중복 검사 오류 : " + error);
          }
        );
      } else {
        alert("닉네임을 입력해주세요.");
        return;
      }
    },
    changeSido() {
      this.isSidoSelected = true;

      getDongCode(
        "gugun",
        this.selectedSido,
        ({ data }) => {
          if (data.flag === "success") {
            this.optionGugun = data.data;
          }
        },
        (error) => {
          console.log("말머리 불러오기 오류 : " + error);
        }
      );
    },
  },
  created() {
    const id = JSON.parse(localStorage.getItem("loginUser")).userId;

    getUserDetail(
      id,
      ({ data }) => {
        if (data.flag === "success") {
          this.user = data.data[0];

          if (this.user.location === null) this.user.location = "지역을 설정해주세요";
          else this.hasUserLocation = true;
        } else {
          alert("일치하는 회원이 없습니다.");
          this.$router.push("/user/login");
        }
      },
      (error) => {
        console.log("회원 상세 불러오기 중 에러 : " + error);
      }
    );

    getDongCode(
      "sido",
      0,
      ({ data }) => {
        if (data.flag === "success") {
          this.optionSido = data.data;
        }
      },
      (error) => {
        console.log("시도 옵션 불러오기 오류 : " + error);
      }
    );
  },
};
</script>

<style scoped>
.user-mypage-wrapper {
  display: flex;
  align-items: center;
  background: white;
}

.user-mypage-wrapper > div {
  margin: 0 auto;
}

.mypage-wrapper {
  margin-top: 50px;
  margin-bottom: 130px;
  border: 1px solid white;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  height: 700px;
  width: 550px;
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
  width: 240px;
  height: 35px;
  border-radius: 10px;
  border: 1px solid darkgray;
  padding: 0 10px;
  outline: none;
  font-size: 0.9rem;
}

.mypage-nickname > input {
  width: 90px;
}

.mypage-nickname > button {
  border: none;
  padding: 8px 15px;
  border-radius: 10px;
  background: #5a6268;
  color: white;
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

select {
  height: 35px;
  border-radius: 10px;
  border: 1px solid darkgray;
  padding: 0 5px;
  outline: none;
  font-size: 0.9rem;
}

.mypage-location-wrapper {
  display: flex;
  width: 240px;
}

.mypage-location-wrapper > select:nth-child(1) {
  margin-right: 10px;
}
</style>
