import { apiInstance } from "@/api/index";

const api = apiInstance();

// 게시글 리스트 불러오기
function getBoardList(param, success, fail) {
  api.post(`/board/list`, param).then(success).catch(fail);
}

// 게시글 리스트 갯수 불러오기
function getBoardListCount(param, success, fail) {
  api.post(`/board/count`, param).then(success).catch(fail);
}

// 게시글 상세 보기
function getBoardDetail(id, success, fail) {
  api.get(`/board/${id}`).then(success).catch(fail);
}

// 게시글 등록
function writeBoard(param, success, fail) {
  api.post(`/board`, param).then(success).catch(fail);
}

// 게시글 수정
function modifyBoard(id, param, success, fail) {
  api.put(`/board/${id}`, param).then(success).catch(fail);
}

// 게시글 삭제
function deleteBoard(id, success, fail) {
  api.delete(`/board/${id}`).then(success).catch(fail);
}

// 게시글 말머리
function getBoardSubject(gubun, code, success, fail) {
  api.get(`/board/${gubun}/${code}`).then(success).catch(fail);
}

// 게시글 댓글 보기
function getComment(id, success, fail) {
  api.get(`/comment/${id}`).then(success).catch(fail);
}

// 게시글 댓글 작성
function writeComment(param, success, fail) {
  api.post(`/comment`, param).then(success).catch(fail);
}

// 게시글 댓글 수정
function modifyComment(param, success, fail) {
  api.put(`/comment`, param).then(success).catch(fail);
}

// 게시글 댓글 삭제
function deleteComment(id, success, fail) {
  api.delete(`/comment/${id}`).then(success).catch(fail);
}

export {
  getBoardList,
  getBoardListCount,
  getBoardDetail,
  writeBoard,
  modifyBoard,
  deleteBoard,
  getBoardSubject,
  getComment,
  writeComment,
  modifyComment,
  deleteComment,
};
