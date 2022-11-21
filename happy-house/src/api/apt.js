import { apiInstance } from ".";

const api = apiInstance();

// GET

function getDongCode(gubun, code, success, fail) {
  api.get(`/apt/${gubun}/${code}`).then(success).catch(fail);
}

function getAptInfo(code, success, fail) {
  api.get(`/apt/list/${code}`).then(success).catch(fail);
}

function getAptInfoBySidoGugun(sido, gugun, success, fail) {
  api.get(`/apt/lists/${sido}/${gugun}`).then(success).catch(fail);
}

function getClusterSido(success, fail) {
  api.get(`/apt/cluster/sido`).then(success).catch(fail);
}

function getClusterGugun(success, fail) {
  api.get(`/apt/cluster/gugun`).then(success).catch(fail);
}

function getAptDealInfo(code, success, fail) {
  api.get(`/apt/detail/${code}`).then(success).catch(fail);
}

function getLatLngFromDongcode(code, success, fail) {
  api.get(`/apt/latlng/${code}`).then(success).catch(fail);
}

export {
  getDongCode,
  getAptInfo,
  getAptInfoBySidoGugun,
  getClusterSido,
  getClusterGugun,
  getAptDealInfo,
  getLatLngFromDongcode,
};
