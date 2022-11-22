<template>
  <div class="interest-regist-wrapper">
    <div class="interest-regist">
      <select v-model="selectedSido" @change="changeSido">
        <option disabled value="">시/도</option>
        <option v-for="(list, index) in optionSido" :key="index" :value="list.dongCode">
          {{ list.sidoName }}
        </option>
      </select>
      <select v-model="selectedGugun">
        <option disabled value="">구/군</option>
        <option v-for="(list, index) in optionGugun" :key="index" :value="list.dongCode">
          {{ list.gugunName }}
        </option>
      </select>
      <button @click="registInterestRegion">관심지역 등록</button>
    </div>
  </div>
</template>

<script type="module">
import { getDongCode } from "@/api/apt";
import { registInterest } from "@/api/interest";

export default {
  name: "InterestRegist",
  data() {
    return {
      selectedSido: 0,
      selectedGugun: 0,
      optionSido: [],
      optionGugun: [],
    };
  },
  created() {
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
  methods: {
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
    registInterestRegion() {
      const userId = JSON.parse(localStorage.getItem("loginUser")).userId;

      const interest = {
        dongCode: this.selectedGugun,
        userId: userId,
      };

      registInterest(
        interest,
        ({ data }) => {
          if (data.flag === "success") {
            this.$router.go();
          }
        },
        (error) => {
          console.log("관심지역 등록 오류 : " + error);
        }
      );
    },
  },
};
</script>

<style scoped>
.interest-regist-wrapper {
  width: 100%;
  height: 120px;
  padding: 30px 120px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f8f8f8;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
}

.interest-regist {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.interest-regist > select {
  padding: 10px 10px;
  width: 200px;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  margin-right: 20px;
  border: 1px solid #ddd;
}

.interest-regist > button {
  width: 120px;
  height: 45px;
  font-weight: bold;
  color: #007bff;
  border: 0;
  outline: 0;
  background: white;
  border: 1px solid #007bff;
  border-radius: 10px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.interest-regist > button:hover {
  color: white;
  background: #007bff;
}
</style>
