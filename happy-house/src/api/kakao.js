import { kakaoInstance } from ".";

const kakaoapi = kakaoInstance();

// GET

function getKakaoLocation(location, success, fail) {
  kakaoapi
    .get(
      `/v2/local/search/address.json?query=${encodeURIComponent(location)}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_REST_API_KEY}`,
        },
      }
    )
    .then(success)
    .catch(fail);
}
function getFindLocation(info, success, fail) {
  kakaoapi
    .get(
      `/v2/local/search/category.json?category_group_code=${encodeURIComponent(
        info.category
      )}&x=${encodeURIComponent(info.lng)}&y=${encodeURIComponent(
        info.lat
      )}&radius=1500`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_REST_API_KEY}`,
        },
      }
    )
    .then(success)
    .catch(fail);
}
export { getKakaoLocation, getFindLocation };
