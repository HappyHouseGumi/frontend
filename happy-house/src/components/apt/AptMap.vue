<template>
  <div class="map-wrapper">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: "AptMap",
  data() {
    return {
      map: null,
    };
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
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      this.map = new kakao.maps.Map(container, options);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude; // 위도
          const lon = position.coords.longitude; // 경도

          const locPosition = new kakao.maps.LatLng(lat, lon);
          const message = '<div style="padding: 5px;">현위치</div>';

          const marker = new kakao.maps.Marker({
            map: this.map,
            position: locPosition,
          });

          let iwContent = message;
          let iwRemoveable = true;

          const infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
            removable: iwRemoveable,
          });

          infowindow.open(this.map, marker);

          this.map.setCenter(locPosition);
        });
      } else {
        const locPosition = new kakao.maps.LatLng(36.10713409712998, 128.41613463250704);
        const message = '<div style="padding: 5px;">현위치 로드불가</div>';

        const marker = new kakao.maps.Marker({
          map: this.map,
          position: locPosition,
        });

        let iwContent = message;
        let iwRemoveable = true;

        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        infowindow.open(this.map, marker);

        this.map.setCenter(locPosition);
      }
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
