<template>
  <div>
    <colgroup>
      <col style="width: 250px" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <th>
          <label>{{ question.userName }}</label>
          <label>님의 질문</label>
        </th>
        <td>
          <router-link :to="{ name: 'qnadetail', params: { id: question.id } }"
            ><b>Q.</b> {{ question.title }}</router-link
          >
        </td>
      </tr>
    </tbody>
  </div>
</template>

<script>
export default {
  name: "QnaListItem",
  props: {
    question: Object,
  },
  methods: {},
};
</script>

<style scoped>
colgroup {
  display: table-column-group;
}

tbody {
  display: table-row-group;
  vertical-align: middle;
}

tr {
  display: table-row;
}

th {
  height: 55px;
  text-align: left;
  padding-left: 15px;
  font-weight: bold;
  color: #222;
  border-bottom: 1px solid #d8d8d8;
  background: #f9f9f9;
  line-height: 18px;
}

th > label:nth-child(2) {
  font-weight: normal;
  font-size: 0.8rem;
  margin-left: 5px;
}

td {
  width: 80%;
  height: 55px;
  padding: 10px 15px;
  color: #222;
  border-bottom: 1px solid #d8d8d8;
  border-left: 1px solid #d8d8d8;
  font-size: 0.9rem;
}

a {
  text-decoration: none;
  color: #666;
}
</style>
