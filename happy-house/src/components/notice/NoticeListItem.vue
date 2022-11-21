<template>
  <tr>
    <!-- <td>{{ pgno }}</td>
      <td>{{ index + 1 }}</td> -->
    <td>{{ notice.id }}</td>
    <td style="font-weight: bold">
      <router-link :to="{ name: 'noticedetail', params: { id: notice.id } }">{{ notice.title }}</router-link>
    </td>
    <td>운영자</td>
    <td>{{ notice.regDate }}</td>
  </tr>
</template>

<script type="module">
export default {
  name: "NoticeListItem",
  props: {
    notice: Object,
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
