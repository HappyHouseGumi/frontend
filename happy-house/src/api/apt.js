import { apiInstance } from ".";

const api = apiInstance();

// GET

function getDongCode(gubun, code, success, fail) {
  api.get(`/apt/${gubun}/${code}`).then(success).catch(fail);
}

export { getDongCode };
