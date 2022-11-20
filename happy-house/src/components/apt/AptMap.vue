<template>
  <div class="map-wrapper">
    <div id="map"></div>
  </div>
</template>

<script>
import {
  getAptInfoBySidoGugun,
  getClusterSido,
  getClusterGugun,
} from "@/api/apt";
import { mapState, aptStore } from "vuex";

export default {
  name: "AptMap",
  data() {
    return {
      map: null,
      clusterer: null,
      sidos: null,
      guguns: null,
      makers: [],
      cur_sido: "",
      cur_gugun: "",
      geocoder: null,
    };
  },
  created: {
    ...mapState(aptStore, ["searchedLocation"]),

    // vuex 에서 x, y값이 담겨있는지 확인하고 있으면 해당 좌표로 중심좌표 만들기
  },
  mounted() {
    // script 태그 객체 생성
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}&libraries=services,clusterer,drawing`;
      /* global kakao */
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else {
      console.log("이미 로딩됨: ", window.kakao);

      this.initMap();
    }
    if (!this.sidos) {
      getClusterSido(
        ({ data }) => {
          //console.log(data.data);
          data.data.forEach((element) => {
            var content = `<div class = "sido"><h1>${element.count}</h1></div>`;
            var position = new kakao.maps.LatLng(element.lat, element.lng);
            var customOverlay = new kakao.maps.CustomOverlay({
              position: position,
              content: content,
            });
            customOverlay.setMap(this.map);
            this.sidos = document.getElementsByClassName("sido");
          });
        },
        (error) => {
          console.log("오류 : " + error);
        }
      );
    }
    if (!this.guguns) {
      getClusterGugun(
        ({ data }) => {
          data.data.forEach((element) => {
            var content = `<div class = "gugun" style = "display:none"><h2>${element.count}</h2> </div>`;
            var position = new kakao.maps.LatLng(element.lat, element.lng);
            var customOverlay = new kakao.maps.CustomOverlay({
              position: position,
              content: content,
            });
            customOverlay.setMap(this.map);
            this.guguns = document.getElementsByClassName("gugun");
          });
        },
        (error) => {
          console.log("오류 : " + error);
        }
      );
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
      this.geocoder = new kakao.maps.services.Geocoder();
      console.log(this.geocoder);
      var zoomControl = new kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

      /* 줌 이벤트 시작 */
      kakao.maps.event.addListener(this.map, "zoom_changed", () => {
        // 지도의 현재 레벨을 얻어옵니다
        let level = this.map.getLevel();

        // 레벨 6 이상부터는 마커 출력 XXXXX
        if (level > 5) {
          if (this.makers.length != 0) {
            this.makers.forEach((element) => {
              element.setMap(null);
            });
          }
        }

        /* 클러스터 정보 수정 */
        if (level > 12) {
          if (this.guguns) {
            for (let i = 0; i < this.guguns.length; i++) {
              this.guguns[i].style.display = "none";
            }
            for (let i = 0; i < this.sidos.length; i++) {
              this.sidos[i].style.display = "none";
            }
          }
        } else if (level > 8) {
          if (this.guguns) {
            for (let i = 0; i < this.guguns.length; i++) {
              this.guguns[i].style.display = "none";
            }
          }
          if (this.sidos) {
            for (let i = 0; i < this.sidos.length; i++) {
              this.sidos[i].style.display = "";
            }
          }
        } else if (level <= 8 && level > 5) {
          //console.log(this.sidos);
          for (let i = 0; i < this.sidos.length; i++) {
            this.sidos[i].style.display = "none";
          }
          if (this.guguns) {
            for (let i = 0; i < this.guguns.length; i++) {
              this.guguns[i].style.display = "";
            }
          }
        } else {
          for (let i = 0; i < this.sidos.length; i++) {
            this.sidos[i].style.display = "none";
          }
          if (this.guguns) {
            for (let i = 0; i < this.guguns.length; i++) {
              this.guguns[i].style.display = "none";
            }
          }
          if (this.makers.length != 0) {
            this.makers.forEach((element) => {
              element.setMap(this.map);
            });
          }
        }
      });

      // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(this.map, "idle", () => {
        this.searchAddrFromCoords(this.map.getCenter(), this.displayCenterInfo);
      });
    },
    searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      this.geocoder.coord2RegionCode(
        coords.getLng(),
        coords.getLat(),
        callback
      );
    },
    searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      this.geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    },

    displayCenterInfo(result, status) {
      let sidoName = "";
      let gugunName = "";
      if (status === kakao.maps.services.Status.OK) {
        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            sidoName = result[i].region_1depth_name;
            gugunName = result[i].region_2depth_name;
            break;
          }
        }

        if (sidoName == "세종특별자치시") gugunName = "세종특별자치시";

        if (
          this.map.getLevel() <= 5 &&
          (this.cur_sido != sidoName || this.cur_gugun != gugunName)
        ) {
          // 시도 클러스터 삭제
          for (let i = 0; i < this.sidos.length; i++) {
            this.sidos[i].style.display = "none";
          }
          // 구군 클러스터 삭제
          for (let i = 0; i < this.guguns.length; i++) {
            this.guguns[i].style.display = "none";
          }

          /*기존 마커 제거*/
          this.makers.forEach((element) => {
            element.setMap(null);
          });
          this.makers = [];
          /*--------------*/

          getAptInfoBySidoGugun(
            sidoName,
            gugunName,
            ({ data }) => {
              data.data.forEach((element) => {
                var position = new kakao.maps.LatLng(element.lat, element.lng);
                var marker = new kakao.maps.Marker({
                  position: position,
                });
                marker.setMap(this.map);
                this.makers.push(marker);
              });
              this.cur_sido = sidoName;
              this.cur_gugun = gugunName;
            },
            (error) => {
              console.log("오류 : " + error);
            }
          );
        }
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
