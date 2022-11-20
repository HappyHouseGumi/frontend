<template>
  <div class="map-wrapper">
    <div id="map"></div>
  </div>
</template>

<script type="module">
import { mapState } from "vuex";

const aptStore = "aptStore";

export default {
  name: "AptMap",
  data() {
    return {
      map: null,
    };
  },
  created: {
    ...mapState(aptStore, ["searchedLocation"]),

    // vuex 에서 x, y값이 담겨있는지 확인하고 있으면 해당 좌표로 중심좌표 만들기
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`;

      /* global kakao */
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
      });

      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(36.2683, 127.6358),
        level: 12,
      };
      this.map = new kakao.maps.Map(container, options);
    },
  },
};
</script>

<style scoped>
.map-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}

#map {
  width: 100%;
  height: 92%;
}
</style>
