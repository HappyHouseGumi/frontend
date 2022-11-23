import { apiInstance } from "@/api/index";

const api = apiInstance();

// GET

function getInterestList(id, success, fail) {
  api.get(`/interest/${id}`).then(success).catch(fail);
}

// POST

function registInterest(interest, success, fail) {
  api.post(`/interest`, interest).then(success).catch(fail);
}

// DELETE

function deleteInterest(interest, success, fail) {
  api.delete(`/interest`, { data: interest }).then(success).catch(fail);
}

export { registInterest, getInterestList, deleteInterest };
