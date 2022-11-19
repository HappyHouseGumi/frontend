<template>
  <div>
    <select v-model="selected1" @change="getBoardSubject">
      <option v-for="(list, index) in subject1" :key="index" :value="list.id">
        {{ list.sidoName }}
      </option>
    </select>
    <select v-model="selected2">
      <option v-for="(list, index) in subject2" :key="index" :value="list.gugunName">
        {{ list.gugunName }}
      </option>
    </select>
    <br />
    <span></span>
    <input type="text" v-model="board.title" />
    <input type="text" v-model="board.content" />
    <button @click="writeBoard">등록</button>
    <button @click="moveListBoard">목록</button>
  </div>
</template>

<script>
import { writeBoard, getBoardSubject } from "@/api/board";

export default {
  name: "BoardRegist",

  data() {
    return {
      board: {
        userId: "1",
        subject: "",
        title: "",
        content: "",
      },
      params: {
        pgno: "1",
      },
      subject1: [],
      subject2: [],
      selected1: 0,
      selected2: "",
    };
  },

  created() {
    getBoardSubject(
      "sido",
      0,
      ({ data }) => {
        if (data.flag === "success") {
          this.subject1 = data.data;
        }
      },
      (error) => {
        console.log("말머리 불러오기 오류 : " + error);
      }
    );
  },

  mounted() {},

  methods: {
    writeBoard() {
      this.board.subject = "".concat(this.subject2[0].sidoName, " ", this.selected2);
      // console.log(this.board);

      writeBoard(
        this.board,
        ({ data }) => {
          if (data.flag === "success") {
            alert("게시글 등록 성공");
            this.moveListBoard();
          }
        },
        (error) => {
          console.log("게시글 등록 오류 : " + error);
        }
      );
    },
    moveListBoard() {
      this.$router.push({ name: "boardlist" });
    },
    getBoardSubject() {
      getBoardSubject(
        "gugun",
        this.selected1,
        ({ data }) => {
          if (data.flag === "success") {
            this.subject2 = data.data;
          }
        },
        (error) => {
          console.log("말머리 불러오기 오류 : " + error);
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped></style>
