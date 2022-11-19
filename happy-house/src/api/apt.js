import { apiInstance } from ".";

const api = apiInstance();

// GET

function getDongCode(gubun, code, success, fail) {
  api.get(`/apt/${gubun}/${code}`).then(success).catch(fail);
}

function getAptInfo(code, success, fail) {
  api.get(`/apt/list/${code}`).then(success).catch(fail);
}

export { getDongCode, getAptInfo };
