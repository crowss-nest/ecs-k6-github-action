import { check } from "k6";
import http from "k6/http";
const headers = {
  "x-jwt": "",
  "Content-Type": "application/json",
};
const base_url = "http://api-test.onthelook.co.kr/graphql";
const searchKeywords = ["반팔"];
export const options = {
  stages: [
    { duration: "30s", target: 500 },
  ],
};
function getRandomKeyword() {
  return searchKeywords[Math.floor(Math.random() * searchKeywords.length)];
}
function sendRequest(url, variables) {
  const res = http.post(url, JSON.stringify(variables), {
    headers,
  });
  check(res, {
    "status was good": (r) => r.status >= 200 && r.status < 300,
  });
  return res;
}
function SearchV4(randomKeyword, currentPage) {
  const variables = {
    page: currentPage,
    limit: 20,
    clipRatio: "0.0",
    attributesToRetrieve: ["id", "userId", "gender", "createdAt"],
    filter: "",
    sort: ["createdAt:desc"],
  };

  const url = base_url + randomKeyword;
  sendRequest(url, variables);
}
export default function test() {
  while (true) {
    const randomKeyword = getRandomKeyword();
    let currentPage = 1;
    let hasNextPage = true;
    while (hasNextPage) {
      SearchV4(randomKeyword, currentPage);
      currentPage++;
      if (currentPage > 20) {
        hasNextPage = false;
      }
    }
  }
}