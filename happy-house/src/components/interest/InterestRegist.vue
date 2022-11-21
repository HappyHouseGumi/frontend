<template>
  <div class="interest-regist-wrapper">
    <div class="interest-regist">
      <select v-model="selectedSido" @change="changeSido" ref="selectSido">
        <option v-for="(list, index) in optionSido" :key="index" :value="list.dongCode">
          {{ list.sidoName }}
        </option>
      </select>
      <select v-model="selectedGugun" @change="changeGugun" ref="selectGugun">
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
      selectedSidoName: "",
      selectedGugunName: "",
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

      const selected = this.$refs.selectSido;
      this.selectedSidoName = selected.options[selected.selectedIndex].text;

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
    changeGugun() {
      const selected = this.$refs.selectGugun;
      this.selectedGugunName = selected.options[selected.selectedIndex].text;
    },
    registInterestRegion() {
      const id = JSON.parse(localStorage.getItem("loginUser")).userId;

      const interest = {
        sidoName: this.selectedSidoName,
        gugunName: this.selectedGugunName,
        userId: id,
      };

      console.log(JSON.stringify(interest));

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
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  background: #0069d9;
}
</style>
