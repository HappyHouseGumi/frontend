<template>
  <div class="user-join-wrapper">
    <div class="user-join-types">
      <div>
        <span>회원가입</span>
        <button @click="joinUserOauth">네이버로 회원가입</button>
        <div class="divide-line"></div>
        <div class="user-join-personal-wrapper">
          <input
            placeholder="* 닉네임을 입력해주세요"
            type="text"
            v-model="user.nickName"
            @keyup="checkAvailableNickName"
          />
          <span v-if="user.nickName && isAvailableNickName" class="check-nickname-span" style="color: #0069d9"
            ><i>사용할 수 있는 닉네임입니다.</i></span
          >
          <span v-else-if="user.nickName && !isAvailableNickName" class="check-nickname-span" style="color: #ff0000"
            ><i>사용할 수 없는 닉네임입니다.</i></span
          >
          <input placeholder="* 비밀번호를 입력해주세요" type="password" v-model="user.password" />
          <div class="user-join-email-wrapper">
            <input placeholder="* Email을 입력해주세요" type="email" v-model="user.email" class="user-email-input" />
            <button @click="certifyEmail"><font-awesome-icon icon="fa-solid fa-check" /></button>
          </div>
          <div v-if="isAvailableEmail && isSendEmailAuthor" class="user-join-email-wrapper">
            <input placeholder="인증 코드를 입력해주세요." v-model="inputCode" />
            <button @click="certifyEmailCode">
              <font-awesome-icon icon="fa-solid fa-check" />
            </button>
          </div>
          <button @click="joinUser">회원가입</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="module">
import { registUser, getCheckNickName, checkEmail } from "@/api/user";

export default {
  name: "UserJoin",
  data() {
    return {
      isAvailableNickName: false,
      isAvailableEmail: false,
      isSendEmailAuthor: false,
      inputCode: "",
      authorizedCode: "",
      user: {
        nickName: "",
        password: "",
        email: "",
      },
    };
  },
  methods: {
    joinUserOauth() {
      window.location.href =
        "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=sTS2XWnrv1VAaHN25n9w&state=jsg&redirect_uri=http://119.202.194.94/happy/naver/auth";
    },
    joinUser() {
      if (this.user.nickName === "" || this.user.password === "" || this.user.email === "") {
        alert("빈칸을 모두 채워주세요.");
        return;
      }
      if (!this.isAvailableNickName) {
        alert("닉네임을 다시 확인해주세요.");
        return;
      }
      if (!this.isAvailableEmail) {
        alert("유효한 이메일을 입력해주세요.");
        return;
      }
      if (this.user.nickName.length > 6) {
        alert("닉네임은 최대 6자리 가능합니다.");
        return;
      }

      registUser(
        this.user,
        ({ data }) => {
          if (data.flag === "success") {
            alert("회원가입이 완료되었습니다!!");
            this.$router.push({ path: "/" });
          }
        },
        (error) => {
          console.log("회원가입 오류 : " + error);
        }
      );
    },
    checkAvailableNickName() {
      if (this.user.nickName !== "") {
        getCheckNickName(
          this.user.nickName,
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
    certifyEmail() {
      const regex =
        // eslint-disable-next-line
        /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

      if (this.user.email === "" || !regex.test(this.user.email)) {
        alert("이메일 형식으로 입력해주세요.");
        return;
      }

      this.isSendEmailAuthor = true;

      checkEmail(
        this.user,
        ({ data }) => {
          if (data.flag === "success") {
            alert("입력된 이메일로 전송된 코드를 입력해주세요.");
            this.isAvailableEmail = true;
            this.authorizedCode = data.data[0].code;
          } else {
            this.isAvailableEmail = false;
            alert("이미 가입된 이메일입니다.");
            return;
          }
        },
        (error) => {
          console.log("이메일 유효 검사 오류 : " + error);
        }
      );
    },
    certifyEmailCode() {
      if (this.inputCode === "") {
        alert("코드를 입력해주세요.");
        return;
      }
      console.log();
      if (this.inputCode === this.authorizedCode) {
        alert("이메일 인증에 성공하였습니다!");
        this.isAvailableEmail = true;
      }
    },
  },
};
</script>

<style scoped>
button {
  cursor: pointer;
}

.user-join-wrapper {
  height: 100%;
  background: #ddd;
  display: flex;
  align-items: center;
}

.user-join-types {
  margin: 0 auto;
  width: 500px;
  height: 700px;
  border: 1px solid white;
  border-radius: 10px;
  background: white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

.user-join-types > div {
  /* padding: 30px 20px; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-join-types > div > span {
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 20px;
}

.divide-line {
  width: 400px;
  height: 2px;
  background: #999999;
  margin-bottom: 40px;
}

.user-join-types > div > button {
  width: 350px;
  height: 50px;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  background: #02c759;
  margin-bottom: 30px;
}

.user-join-personal-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.user-join-personal-wrapper > input {
  width: 350px;
  height: 40px;
  padding: 0 10px;
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
}

.user-join-personal-wrapper > input:nth-child(1) {
  margin-top: 0;
}

.user-join-email-wrapper > input {
  width: 315px;
  height: 40px;
  padding: 0 10px;
  margin-top: 30px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
}

.user-join-email-wrapper > button {
  border: none;
  outline: none;
  background: none;
}

.user-join-personal-wrapper > span {
  font-size: 0.9rem;
  margin-top: 5px;
  font-weight: bold;
}

.user-join-personal-wrapper > button {
  width: 350px;
  height: 50px;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 10px;
  background: #3c90e2;
  margin-top: 30px;
}
</style>
