import { apiInstance } from "@/api/index";

const api = apiInstance();

// 관심글 리스트 불러오기
function getLikeList(param, success, fail) {
  api.post(`/like/list`, param).then(success).catch(fail);
}

// 관심글 리스트 갯수 불러오기
function getLikeListCount(param, success, fail) {
  api.post(`/like/count`, param).then(success).catch(fail);
}

// 관심글 존재 여부 확인하기
function checkLike(param, success, fail) {
  api.post(`/like/check`, param).then(success).catch(fail);
}

// 관심글 별 개수 확인하기
function getCountLike(id, success, fail) {
  api.get(`/like/countBoard/${id}`).then(success).catch(fail);
}

// 관심글 등록
function registLike(param, success, fail) {
  api.post(`/like`, param).then(success).catch(fail);
}

// 관심글 삭제
function deleteLike(boardid, userid, success, fail) {
  api.delete(`/like/${boardid}/${userid}`).then(success).catch(fail);
}

// 게시글 별 좋아요 사용자 불러오기
function getLikeUser(boardid, success, fail) {
  api.get(`/like/likeUser/${boardid}`).then(success).catch(fail);
}

export { getLikeList, getLikeListCount, checkLike, getCountLike, registLike, deleteLike, getLikeUser };
