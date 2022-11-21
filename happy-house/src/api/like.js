import { apiInstance } from "@/api/index";

const api = apiInstance();

// 관심글 리스트 불러오기
function getLikeList(param, success, fail) {
  api.post(`/like/list`, param).then(success).catch(fail);
}

// 관심글 존재 여부 확인하기
function checkLike(param, success, fail) {
  api.post(`/like/check`, param).then(success).catch(fail);
}

// 관심글 등록
function registLike(param, success, fail) {
  api.post(`/like`, param).then(success).catch(fail);
}

// 관심글 삭제
function deleteLike(boardid, userid, success, fail) {
  api.delete(`/like/${boardid}/${userid}`).then(success).catch(fail);
}

export { getLikeList, checkLike, registLike, deleteLike };
