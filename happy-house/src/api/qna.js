import { apiInstance } from ".";

const api = apiInstance();

// GET

function getQnaList(success, fail) {
  api.get(`/qna`).then(success).catch(fail);
}

function getQnaSearchList(category, searchinput, success, fail) {
  api.get(`/qna/search/${category}/${searchinput}`).then(success).catch(fail);
}

function getQnaDetail(id, success, fail) {
  api.get(`/qna/${id}`).then(success).catch(fail);
}

function getQnaComment(id, success, fail) {
  api.get(`/qnacomment/${id}`).then(success).catch(fail);
}

// POST

function registQna(question, success, fail) {
  api.post(`/qna`, question).then(success).catch(fail);
}

function registQnaComment(comment, success, fail) {
  api.post(`/qnacomment`, comment).then(success).catch(fail);
}

// PUT

function modifyQna(id, question, success, fail) {
  api.put(`/qna/${id}`, question).then(success).catch(fail);
}

function modifyQnaComment(id, comment, success, fail) {
  api.put(`/qnacomment/${id}`, comment).then(success).catch(fail);
}

// DELETE

function deleteQna(id, success, fail) {
  api.delete(`/qna/${id}`).then(success).catch(fail);
}

function deleteQnaComment(id, success, fail) {
  api.delete(`/qnacomment/${id}`).then(success).catch(fail);
}

export {
  getQnaList,
  getQnaSearchList,
  registQna,
  deleteQna,
  registQnaComment,
  getQnaDetail,
  getQnaComment,
  modifyQna,
  modifyQnaComment,
  deleteQnaComment,
};
