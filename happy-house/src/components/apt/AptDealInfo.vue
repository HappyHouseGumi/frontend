<template>
  <div class="apt-info-wrapper">
    <div class="apt-info-header-wrapper">
      <span>아파트 이름</span>
      <button><font-awesome-icon icon="fa-solid fa-xmark" class="fa-2x" /></button>
    </div>
    <div>아파트 정보들 둘 곳</div>
  </div>
</template>

<script>
export default {
  name: "AptDealInfo",
  props: {
    clickedMarker: {},
  },
  data() {
    return {
      aptDealInfo: {},
    };
  },
  created() {
    // 서버에 clickedMarkerCode 넘겨서 아파트 정보 받아오기
  },
};
</script>

<style scoped>
.apt-info-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.apt-info-header-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.apt-info-header-wrapper > button {
  border: none;
  background: none;
}
</style>
