<template>
  <div id="naver_id_login"></div>
</template>

<script type="module">
import { mapState, mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "UserOauthJoin",
  computed: {
    ...mapState(userStore, ["isLoginStatus"]),
  },
  methods: {
    ...mapActions(userStore, ["userLoginOauthAction"]),
  },
  mounted() {
    const naver_id_login = new window.naver_id_login("sTS2XWnrv1VAaHN25n9w", "http://localhost:8080/user/oauthjoin");

    const accessToken = {
      access_token: naver_id_login.getAccessToken(),
    };

    this.userLoginOauthAction(accessToken);
  },
};
</script>

<style scoped></style>
