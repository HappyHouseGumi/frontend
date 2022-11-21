import { apiInstance } from "@/api/index";

const api = apiInstance();

// 게시글 리스트 불러오기
function getLikeList(param, success, fail) {
  api.post(`/like/list`, param).then(success).catch(fail);
}

// 게시글 등록
function registLike(param, success, fail) {
  api.post(`/like`, param).then(success).catch(fail);
}

// 게시글 삭제
function deleteLike(id, success, fail) {
  api.delete(`/like/${id}`).then(success).catch(fail);
}

export { getLikeList, registLike, deleteLike };
