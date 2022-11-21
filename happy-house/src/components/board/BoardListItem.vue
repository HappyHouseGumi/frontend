<template>
  <tr>
    <!-- <td>{{ pgno }}</td>
      <td>{{ index + 1 }}</td> -->
    <td>{{ board.id }}</td>
    <td>{{ board.subject }}</td>
    <td style="font-weight: bold">
      <router-link :to="{ name: 'boarddetail', params: { id: board.id } }">{{ board.title }}</router-link>
    </td>
    <td>{{ board.nickName }}</td>
    <td>{{ board.regDate }}</td>
  </tr>
</template>

<script type="module">
export default {
  name: "BoardListItem",
  props: {
    board: Object,
    paramsDetail: Object,
    // pgno: Number,
    // index: Number,
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
td {
  width: 80%;
  height: 55px;
  padding: 10px 15px;
  border-bottom: 1px solid #d8d8d8;
  font-size: 0.9rem;
}

a {
  text-decoration: none;
  color: #666;
}
</style>
