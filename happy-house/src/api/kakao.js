import { kakaoInstance } from ".";

const kakaoapi = kakaoInstance();

// GET

function getKakaoLocation(location, success, fail) {
  kakaoapi
    .get(`/v2/local/search/address.json?query=${encodeURIComponent(location)}`, {
      headers: {
        Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_REST_API_KEY}`,
      },
    })
    .then(success)
    .catch(fail);
}

export { getKakaoLocation };
