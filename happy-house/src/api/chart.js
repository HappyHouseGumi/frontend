import { apiInstance } from "@/api/index";

const api = apiInstance();

// 관심 지역 랭킹 리스트 불러오기
function getRankingIntersts(code, success, fail) {
  api.get(`/interest/ranking/${code}`).then(success).catch(fail);
}

export { getRankingIntersts };
