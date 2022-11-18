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

export { registUser, getCheckNickName, checkEmail, login };
