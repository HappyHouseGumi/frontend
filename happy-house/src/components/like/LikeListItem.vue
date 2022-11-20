<template>
  <tr>
    <!-- <td>{{ pgno }}</td>
      <td>{{ index + 1 }}</td> -->
    <td>{{ like.boardId }}</td>
    <td>{{ like.subject }}</td>
    <td style="font-weight: bold">
      <router-link :to="{ name: 'boarddetail', params: { id: like.boardId } }">{{ like.title }}</router-link>
    </td>
    <td>{{ like.nickName }}</td>
  </tr>
</template>

<script type="module">
export default {
  name: "LikeListItem",
  props: {
    like: Object,
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
