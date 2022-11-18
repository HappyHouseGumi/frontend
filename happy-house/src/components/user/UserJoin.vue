<template>
  <div class="user-join-wrapper">
    <div class="user-join-types">
      <div>
        <span>회원가입</span>
        <button>네이버로 회원가입</button>
        <div class="divide-line"></div>
        <div class="user-join-personal-wrapper">
          <input placeholder="* ID를 입력해주세요" type="text" v-model="user.account" @keyup="checkAvailableID" />
          <span v-if="user.account && isAvailableID" class="check-id-span" style="color: #0069d9"
            ><i>사용할 수 있는 ID입니다.</i></span
          >
          <span v-else-if="user.account && !isAvailableID" class="check-id-span" style="color: #ff0000"
            ><i>사용할 수 없는 ID입니다.</i></span
          >
          <input placeholder="* 비밀번호를 입력해주세요" type="password" v-model="user.password" />
          <input placeholder="* 이름을 입력해주세요" type="text" v-model="user.name" />
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
import { registUser, getCheckId, checkEmail } from "@/api/user";

export default {
  name: "UserJoin",
  data() {
    return {
      isAvailableID: false,
      isAvailableEmail: false,
      isSendEmailAuthor: false,
      inputCode: "",
      authorizedCode: "",
      user: {
        account: "",
        password: "",
        name: "",
        email: "",
      },
    };
  },
  methods: {
    joinUser() {
      if (this.user.account === "" || this.user.password === "" || this.user.name === "" || this.user.email === "") {
        alert("빈칸을 모두 채워주세요.");
        return;
      }
      if (!this.isAvailableID) {
        alert("ID를 다시 확인해주세요.");
        return;
      }
      if (!this.isAvailableEmail) {
        alert("유효한 이메일을 입력해주세요.");
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
    checkAvailableID() {
      if (this.user.account !== "") {
        getCheckId(
          this.user.account,
          ({ data }) => {
            if (data.flag === "success") {
              this.isAvailableID = true;
            } else this.isAvailableID = false;
          },
          (error) => {
            console.log("아이디 중복 검사 오류 : " + error);
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
  height: 100%;
  padding: 30px 20px;
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
  background: #19ce60;
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
  width: 320px;
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
