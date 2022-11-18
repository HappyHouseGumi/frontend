import { apiInstance } from ".";

const api = apiInstance();

// GET

function getCheckNickName(nickname, success, fail) {
  api.get(`/user/checknick/${nickname}`).then(success).catch(fail);
}

// POST

function registUser(user, success, fail) {
  api.post(`/user`, user).then(success).catch(fail);
}

function checkEmail(user, success, fail) {
  api.post(`/email`, user).then(success).catch(fail);
}

function login(user, success, fail) {
  api.post(`/user/login`, user).then(success).catch(fail);
}

function loginOauth(token, success, fail) {
  api.post(`/naver`, token).then(success).catch(fail);
}

// PUT

function modifyUser(id, user, success, fail) {
  api.put(`/user/${id}`, user).then(success).catch(fail);
}

// DELETE

function deleteUser(id, success, fail) {
  api.delete(`/user/${id}`).then(success).catch(fail);
}

export { registUser, getCheckNickName, checkEmail, login, loginOauth, modifyUser, deleteUser };
