import { check, sleep } from 'k6';
import http from 'k6/http';

export let options = {
  stages: [
    { duration: '2m', target: 217 }, // 분당 약 4,305 RequestCount의 3배 (약 12,915 req/min)
    { duration: '2m', target: 287 }, // 분당 약 4,305 RequestCount의 4배 (약 17,220 req/min)
    { duration: '2m', target: 359 }, // 분당 약 4,305 RequestCount의 5배 (약 21,525 req/min)
    { duration: '2m', target: 430 }, // 분당 약 4,305 RequestCount의 6배 (약 25,830 req/min)
    { duration: '1m', target: 0 },
  ],
};

const searchKeywords = ['점퍼', '가디건', '폴로', '셔츠', '데님팬츠', '카고팬츠', '바람막이', '반팔', '가젤', '블레이저', '포터리', '아디다스', '라퍼지스토어', '스투시', '나이키', '컨버스', '아식스', '반스', '맨투맨', '청바지', '로퍼', '반바지', '드레스', '백팩', '후드', '아노락', '트러커', '조거팬츠', '치마', '볼캡', '청자켓', '쿠어', '아크테릭스', '모드나인', '뉴발란스', '노매뉴얼', '엘무드', '세터', '토피', '미스치프', '마뗑킴', '살로몬', '파르티멘토', '칼하트', '코스', '유니클로', '파타고니아', '프라다', '라코스테', '디올', '루이비통'];

function getRandomSearchKeyword() {
  return searchKeywords[Math.floor(Math.random() * searchKeywords.length)];
}

export default function () {
  const searchKeyword = getRandomSearchKeyword();
  const url = `https://api-stg.onthelook.co.kr/graphql`;

  const res = http.get(url);

  check(res, {
    'status was 200': (r) => r.status === 200,
  });

  console.log(`검색어: ${searchKeyword}, 상태코드: ${res.status}`);
  sleep(1);
}
