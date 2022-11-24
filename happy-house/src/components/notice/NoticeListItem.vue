<template>
  <table>
    <thead>
      <tr>
        <th>No.</th>
        <th>제목</th>
        <th>작성자</th>
        <th>등록일</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(notice, index) in notices"
        :key="index"
        :notice="notice"
        :index="index"
        @click="(id) => moveNoticeDetail(notice.id)"
      >
        <td>
          <b>{{ noticesLength - index }}</b>
        </td>
        <td>
          {{ notice.title }}
        </td>
        <td>운영자</td>
        <td>{{ notice.regDate }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script type="module">
export default {
  name: "NoticeListItem",
  props: {
    notices: [],
  },
  data() {
    return {
      noticesLength: 0,
    };
  },
  updated() {
    if (this.notices) this.noticesLength = this.notices.length;
  },
  methods: {
    moveNoticeDetail(id) {
      this.$router.push({ name: "noticedetail", params: { id: id } });
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
