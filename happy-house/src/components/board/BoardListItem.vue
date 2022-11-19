<template>
  <div>
    <colgroup>
      <col style="width: 250px" />
      <col style="width: auto" />
    </colgroup>
    <tbody>
      <tr>
        <td>{{ board.id }}</td>
        <td>{{ board.subject }}</td>
        <td>
          <router-link :to="{ name: 'boarddetail', params: { id: board.id } }">{{ board.title }}</router-link>
        </td>
        <td>{{ board.userId }}</td>
        <td>{{ board.regDate }}</td>
      </tr>
    </tbody>
  </div>
</template>

<script>
export default {
  name: "BoardListItem",
  props: {
    board: Object,
  },

  data() {
    return {};
  },

  mounted() {},

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
