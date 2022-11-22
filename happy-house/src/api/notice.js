import { apiInstance } from "@/api/index";

const api = apiInstance();

// 게시글 리스트 불러오기
function getNoticeList(param, success, fail) {
  api.post(`/notice/list`, param).then(success).catch(fail);
}

// 게시글 리스트 갯수 불러오기
function getNoticeListCount(param, success, fail) {
  api.post(`/notice/count`, param).then(success).catch(fail);
}

// 게시글 상세 보기
function getNoticeDetail(id, success, fail) {
  api.get(`/notice/${id}`).then(success).catch(fail);
}

// 게시글 등록
function writeNotice(param, success, fail) {
  api.post(`/notice`, param).then(success).catch(fail);
}

// 게시글 수정
function modifyNotice(id, param, success, fail) {
  api.put(`/notice/${id}`, param).then(success).catch(fail);
}

// 게시글 삭제
function deleteNotice(id, success, fail) {
  api.delete(`/notice/${id}`).then(success).catch(fail);
}

export { getNoticeList, getNoticeListCount, getNoticeDetail, writeNotice, modifyNotice, deleteNotice };
