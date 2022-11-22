<template>
  <div class="map-wrapper">
    <div id="map"></div>
    <div id="map-floating-btn-wrapper" @click="(e) => clickCategory(e)">
      <button @click="press('sc')" class="categoryDeactive">학교</button>
    </div>
    <div id="map-floating-btn-wrapper" @click="(e) => clickCategory(e)">
      <button @click="press('ce')" class="categoryDeactive">카페</button>
    </div>
    <div id="map-floating-btn-wrapper" @click="(e) => clickCategory(e)">
      <button @click="press('cs')" class="categoryDeactive">편의점</button>
    </div>
    <div v-if="isMarkerClicked" class="apt-deal-wrapper">
      <AptDealInfo
        :clickedMarker="clickedMarker"
        @closeAptDealInfo="closeAptDealInfo"
        @moveTo="moveTo"
        @favorPress="favorPress" />
    </div>
  </div>
</template>

<script>
import {
  getAptInfoBySidoGugun,
  getClusterSido,
  getClusterGugun,
  getAptDealInfo,
  getInterestApts,
  addInterestApt,
  deleteInterestApt,
} from "@/api/apt";
import { getFindLocation, getCoordsToAddress } from "@/api/kakao";
import { mapState, mapGetters, mapMutations } from "vuex";
import AptDealInfo from "@/components/apt/AptDealInfo.vue";
const aptStore = "aptStore";

export default {
  name: "AptMap",
  components: {
    AptDealInfo,
  },
  data() {
    return {
      map: null,
      clusterer: null,
      sidos: null,
      guguns: null,
      makers: [],
      userId: 0,
      commakers: {
        cs: [],
        ce: [],
        sc: [],
      },
      precommakers: {
        cs: [],
        ce: [],
        sc: [],
      },
      cur_sido: "",
      cur_gugun: "",
      geocoder: null,
      lat: 36.2683,
      lng: 127.6358,
      level: 12,
      interestApt: new Set(),
      interestMarker: [],
      select_marker: null,
      marker: null,
      circle: null,
      isMarkerClicked: false,
      clickedMarker: {
        addressName: "",
        code: "",
        favor: false,
        pos: null,
      },
      toggle: {
        cs: false,
        ce: false,
        sc: false,
      },
      select_toggle_cnt: 0,
    };
  },
  computed: {
    ...mapState(aptStore, ["searchedLocation", "dealList"]),
    ...mapGetters(aptStore, ["GET_LOC"]),
    ...mapMutations(aptStore, ["RESET_SEARCHED_LOCATION"]),
  },

  mounted() {
    // script 태그 객체 생성
    if (this.GET_LOC.level == 6) {
      this.lat = this.GET_LOC.x;
      this.lng = this.GET_LOC.y;
      this.level = this.GET_LOC.level;
      this.RESET_SEARCHED_LOCATION;
    }
    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}&libraries=services,clusterer,drawing`;
      /* global kakao */
      script.addEventListener("load", () => {
        kakao.maps.load(this.initMap);
      });
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
    this.sidos = [];
    this.guguns = [];

    getClusterSido(
      ({ data }) => {
        //console.log(data.data);
        data.data.forEach((element) => {
          var content = null;
          if (this.level == 6)
            content = `<div class = "sido" style="display:none; font-size : 20px; font-weight:bold">${element.count}</div>`;
          else
            content = `<div class = "sido" style="display:; font-size : 20px; font-weight:bold">${element.count}</div>`;
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

    getClusterGugun(
      ({ data }) => {
        data.data.forEach((element) => {
          var content = null;
          if (this.level == 6)
            content = `<div class = "gugun" style = "display:; font-size : 20px; font-weight:bold">${element.count} </div>`;
          else
            content = `<div class = "gugun" style = "display:none; font-size : 20px; font-weight:bold">${element.count}</div>`;
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
  },
  methods: {
    ...mapMutations(aptStore, ["SET_DEAL_LIST"]),
    closeAptDealInfo() {
      this.isMarkerClicked = false;
      this.closeCommarker();
      if (this.select_marker) {
        var selectMarkerImage = this.getMarkerImg("marker", 8, 8);
        if (this.interestApt.has(this.clickedMarker.code)) {
          selectMarkerImage = this.getMarkerImg("marker_inter", 25, 25);
        }
        this.select_marker.setImage(selectMarkerImage);
        this.select_marker = null;
      }
    },
    moveTo(pos) {
      this.map.setLevel(5);
      this.map.panTo(pos);
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(this.lat, this.lng),
        level: this.level,
      };

      this.map = new kakao.maps.Map(container, options);
      this.geocoder = new kakao.maps.services.Geocoder();
      // console.log(this.geocoder);
      var zoomControl = new kakao.maps.ZoomControl();
      this.map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      this.createInterestMarkers();
      /* 줌 이벤트 시작 */
      kakao.maps.event.addListener(this.map, "zoom_changed", () => {
        // 지도의 현재 레벨을 얻어옵니다
        let level = this.map.getLevel();

        // 레벨 6 이상부터는 마커 출력 XXXXX
        if (level >= 6) {
          if (this.makers.length != 0) {
            this.makers.forEach((element) => {
              if (this.select_marker != element) element.setMap(null);
            });
          }
          this.interestMarker.forEach((element) => {
            console.log(element);
            element.setMap(this.map);
          });

          this.hideCommarker();
        } else {
          this.interestMarker.forEach((element) => {
            element.setMap(null);
          });
          if (this.select_toggle_cnt != 0) this.showCommarker();
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
    press(category) {
      if (this.map.getLevel() >= 7) return; // 맵 레벨이 7이상이면 리턴
      if (!this.select_marker) return; // 선택 마커 없으면 리턴
      this.toggle[category] = !this.toggle[category];
      if (this.toggle[category]) {
        if (this.circle) this.circle.setMap(this.map);
        this.select_toggle_cnt++;
        this.commakers[category].forEach((element) => {
          element.setMap(this.map);
        });
      } else {
        this.commakers[category].forEach((element) => {
          element.setMap(null);
        });
        this.select_toggle_cnt--;
      }
      if (this.select_toggle_cnt == 1) {
        if (this.circle) this.circle.setMap(this.map);
      }
      if (this.select_toggle_cnt == 0) {
        if (this.circle) this.circle.setMap(null);
      }
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
            if (this.select_marker != element) element.setMap(null);
          });
          // this.makers = [];
          // if (this.circle) {
          //   this.circle.setMap(null);
          //   this.circle = null;
          // }
          /*--------------*/

          getAptInfoBySidoGugun(
            sidoName,
            gugunName,
            ({ data }) => {
              data.data.forEach((element) => {
                var position = new kakao.maps.LatLng(element.lat, element.lng);

                var markerImage = this.getMarkerImg("marker", 12, 12);
                if (this.interestApt.has(element.aptcode)) {
                  markerImage = this.getMarkerImg("marker_inter", 25, 25);
                }
                var marker = new kakao.maps.Marker({
                  position: position,
                  image: markerImage,
                });
                kakao.maps.event.addListener(marker, "click", () => {
                  this.closeCommarker();
                  if (this.select_marker) {
                    var selectMarkerImage = this.getMarkerImg("marker", 12, 12);
                    if (this.interestApt.has(this.clickedMarker.code)) {
                      selectMarkerImage = this.getMarkerImg(
                        "marker_inter",
                        25,
                        25
                      );
                    }
                    this.select_marker.setImage(selectMarkerImage);
                  }
                  var pos = marker.getPosition();
                  getCoordsToAddress(
                    pos.La,
                    pos.Ma,
                    ({ data }) => {
                      this.clickedMarker.addressName =
                        data.documents[0].road_address.address_name;
                    },
                    (error) => {
                      console.log("kakao api 좌표로 주소얻기 오류 : " + error);
                    }
                  );
                  this.isMarkerClicked = true;
                  this.clickedMarker.code = element.aptcode;
                  this.clickedMarker.pos = marker.getPosition();
                  if (this.interestApt.has(element.aptcode)) {
                    this.clickedMarker.favor = true;
                  } else {
                    this.clickedMarker.favor = false;
                  }
                  //마커 이미지
                  var markerImage = this.getMarkerImg("marker_point", 35, 35);
                  if (this.interestApt.has(element.aptcode)) {
                    markerImage = this.getMarkerImg("marker_inter", 35, 35);
                  }
                  marker.setImage(markerImage);
                  //학군 정보
                  getFindLocation(
                    { lat: element.lat, lng: element.lng, category: "SC4" },
                    ({ data }) => this.createCommarker(data, "sc"),
                    (error) => {
                      console.log("error", error);
                    }
                  );
                  //카페 정보
                  getFindLocation(
                    { lat: element.lat, lng: element.lng, category: "CE7" },
                    ({ data }) => this.createCommarker(data, "ce"),
                    (error) => {
                      console.log("error", error);
                    }
                  );
                  //편의점 정보
                  getFindLocation(
                    { lat: element.lat, lng: element.lng, category: "CS2" },
                    ({ data }) => this.createCommarker(data, "cs"),
                    (error) => {
                      console.log("error", error);
                    }
                  );

                  this.circle = new kakao.maps.Circle({
                    center: pos, // 원의 중심좌표 입니다
                    radius: 1500, // 미터 단위의 원의 반지름입니다
                    strokeWeight: 5, // 선의 두께입니다
                    strokeColor: "#75B8FA", // 선의 색깔입니다
                    strokeOpacity: 0, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
                    strokeStyle: "dashed", // 선의 스타일 입니다
                    fillColor: "#CFE7FF", // 채우기 색깔입니다
                    fillOpacity: 0.5, // 채우기 불투명도 입니다
                  });
                  //this.circle.setMap(this.map);
                  //SET_DEAL_LIST  TODO
                  getAptDealInfo(
                    this.clickedMarker.code,
                    ({ data }) => {
                      if (data.flag === "success") {
                        this.SET_DEAL_LIST(data.data);
                      }
                    },
                    (error) => {
                      console.log("아파트 거래정보 불러오기 오류 : " + error);
                    }
                  );
                  this.map.setLevel(2);
                  this.map.panTo(pos);
                  this.select_marker = marker;
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
    getMarkerImg(imgName, x, y) {
      var imageSrc = require("@/assets/images/" + imgName + ".png"), // 마커이미지의 주소입니다
        imageSize = new kakao.maps.Size(x, y), // 마커이미지의 크기입니다
        imageOption = { offset: new kakao.maps.Point(0, 0) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );
      return markerImage;
    },
    showCommarker() {
      if (this.circle) {
        this.circle.setMap(this.map);
      }
      this.commakers["sc"].forEach((element) => {
        element.setMap(this.map);
      });
      this.commakers["ce"].forEach((element) => {
        element.setMap(this.map);
      });
      this.commakers["cs"].forEach((element) => {
        element.setMap(this.map);
      });
    },
    hideCommarker() {
      if (this.circle) {
        this.circle.setMap(null);
      }
      this.commakers["sc"].forEach((element) => {
        element.setMap(null);
      });
      this.commakers["ce"].forEach((element) => {
        element.setMap(null);
      });
      this.commakers["cs"].forEach((element) => {
        element.setMap(null);
      });
    },
    closeCommarker() {
      if (this.circle) {
        this.circle.setMap(null);
      }
      this.circle = null;
      this.commakers["sc"].forEach((element) => {
        element.setMap(null);
      });
      this.commakers["ce"].forEach((element) => {
        element.setMap(null);
      });
      this.commakers["cs"].forEach((element) => {
        element.setMap(null);
      });
      this.commakers = {
        cs: [],
        ce: [],
        sc: [],
      };
      this.toggle = {
        cs: false,
        ce: false,
        sc: false,
      };
      this.select_toggle_cnt = 0;
    },
    createCommarker(data, category) {
      data.documents.forEach((com) => {
        var position = new kakao.maps.LatLng(com.y, com.x);
        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = this.getMarkerImg("marker_" + category, 25, 25);
        var marker = new kakao.maps.Marker({
          position: position,
          image: markerImage,
        });
        if (this.toggle[category]) marker.setMap(this.map);
        this.commakers[category].push(marker);
      });
    },
    createInterestMarkers() {
      let user = JSON.parse(localStorage.getItem("loginUser"));
      if (user) {
        this.userId = parseInt(user.userId);
        this.interestMarker.forEach((element) => {
          element.setMap(null);
        });
        this.interestMarker = [];
        getInterestApts(
          this.userId,
          ({ data }) => {
            if (data.flag == "success") {
              data.data.forEach((element) => {
                this.interestApt.add(element.aptcode);
                var position = new kakao.maps.LatLng(element.lat, element.lng);

                var markerImage = this.getMarkerImg("marker_inter", 35, 35);

                var marker = new kakao.maps.Marker({
                  position: position,
                  image: markerImage,
                });
                kakao.maps.event.addListener(marker, "click", () => {
                  this.map.panTo(marker.getPosition());
                });
                marker.setMap(this.map);
                this.interestMarker.push(marker);
              });
            }
          },
          (error) => console.log("createInterestMarkers  error :" + error)
        );
      }
    },
    registInterestMarker(aptcode) {
      let user = JSON.parse(localStorage.getItem("loginUser"));
      if (user) {
        this.userId = user.userId;
        var payload = { userId: this.userId, aptCode: aptcode };
        addInterestApt(
          JSON.stringify(payload),
          ({ data }) => {
            if (data.flag == "success") {
              this.interestApt.add(aptcode);
            }
          },
          (error) => console.log("registInterestMarker  error :" + error)
        );
        this.createInterestMarkers();
      } else {
        alert("회원만 등록 할 수 있습니다!!");
      }
    },
    deleteInterestMarker(aptcode) {
      let user = JSON.parse(localStorage.getItem("loginUser"));
      if (user) {
        this.userId = user.userId;
        var payload = { userId: this.userId, aptCode: aptcode };
        deleteInterestApt(
          JSON.stringify(payload),
          ({ data }) => {
            if (data.flag == "success") {
              this.interestApt.delete(aptcode);
            }
          },
          (error) => console.log("deleteInterestMarker  error :" + error)
        );
        this.createInterestMarkers();
      }
    },
    clickCategory(e) {
      if (e.target.classList[0] === "categoryActive") {
        e.target.classList.remove("categoryActive");
        e.target.classList.add("categoryDeactive");
      } else {
        e.target.classList.remove("categoryDeactive");
        e.target.classList.add("categoryActive");
      }
    },
    favorPress(aptcode, favor) {
      if (favor) {
        this.deleteInterestMarker(aptcode);
      } else {
        if (this.interestApt.size == 10) {
          alert("관심 아파트는 10개까지 밖에 설정이 불가합니다.");
          return;
        }
        this.registInterestMarker(aptcode);
      }
      this.clickedMarker.favor = !this.clickedMarker.favor;
    },
  },
};
</script>

<style scoped>
.map-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

#map {
  width: 100%;
  height: 92%;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

#map-floating-btn-wrapper {
  position: absolute;
  top: 20px;
  left: 30px;
  width: 50px;
  height: 50px;
  background: white;
  z-index: 2;
  border-radius: 3px;
  box-shadow: 0px 1px 4px 0px rgb(0 0 0 / 50%);
}

#map-floating-btn-wrapper:nth-child(2) {
  top: 90px;
}

#map-floating-btn-wrapper:nth-child(3) {
  top: 160px;
}

#map-floating-btn-wrapper > button {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 3px;
  font-size: 0.9rem;
  font-weight: bold;
}

#map-floating-btn-wrapper > button:hover {
  background: gray;
  color: white;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.categoryDeactive {
  background: white;
  color: black;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.categoryActive {
  background: gray;
  color: white;
}

.apt-deal-wrapper {
  width: 560px;
  height: 92%;
  background: white;
  z-index: 10;
  border-left: 1px solid #eee;
  overflow-y: scroll;
}

.apt-deal-wrapper::-webkit-scrollbar {
  width: 8px;
}

.apt-deal-wrapper::-webkit-scrollbar-thumb {
  height: 30%;
  background: #696c73;
  border-radius: 10px;
}

.apt-deal-wrapper::-webkit-scrollbar-track {
  background: none;
}
</style>
