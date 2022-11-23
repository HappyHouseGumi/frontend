import { apiInstance } from "@/api/index";

const api = apiInstance();

function getNewsList(success, fail) {
  api.get(`/data/news`).then(success).catch(fail);
}

function getRegionAvgDeal(sido_name, success, fail) {
  api.post(`/data/avgDeal`, sido_name).then(success).catch(fail);
}

export { getNewsList, getRegionAvgDeal };
