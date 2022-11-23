import { apiInstance } from "@/api/index";

const api = apiInstance();

function getNewsList(success, fail) {
    api.get(`/data/news`).then(success).catch(fail);
  }

export { getNewsList};
