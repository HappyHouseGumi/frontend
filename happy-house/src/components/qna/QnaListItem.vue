<template>
  <table>
    <thead>
      <tr>
        <th>No.</th>
        <th>글쓴이</th>
        <th>제목</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(question, index) in questions" :key="index" @click="(id) => moveQuestionDetail(question.id)">
        <td>
          <b>{{ questionsLength - index }}</b>
        </td>
        <td>
          {{ question.userName }}
        </td>
        <td><b>Q.</b> {{ question.title }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "QnaListItem",
  props: {
    questions: [],
  },
  data() {
    return {
      questionsLength: 0,
    };
  },
  updated() {
    if (this.questions) this.questionsLength = this.questions.length;
  },
  methods: {
    moveQuestionDetail(id) {
      this.$router.push({ name: "qnadetail", params: { id: id } });
    },
  },
};
</script>

<style scoped>
table {
  font-size: 0.9em;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
  width: 100%;
  border-collapse: collapse;
  border-radius: 5px;
  overflow: hidden;
}

th {
  text-align: left;
  font-size: 1rem;
}

thead {
  font-weight: bold;
  color: #fff;
  background: #0069d9;
}

td,
th {
  padding: 15px 30px;
  vertical-align: middle;
}

td {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
}

a {
  color: #73685d;
  text-decoration: none;
}

@media all and (max-width: 768px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  th {
    text-align: right;
  }

  table {
    position: relative;
    padding-bottom: 0;
    border: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  thead {
    float: left;
    white-space: nowrap;
  }

  tbody {
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    white-space: nowrap;
  }

  tr {
    display: inline-block;
    vertical-align: top;
  }

  th {
    border-bottom: 1px solid #a39485;
  }

  td {
    border-bottom: 1px solid #e5e5e5;
  }
}

tr:hover td {
  cursor: pointer;
  background: #e7e5e5;
}
</style>
