import { check, sleep } from 'k6';
import http from 'k6/http';

const searchKeywords = ['점퍼', '가디건', '폴로', '셔츠', '데님팬츠', '카고팬츠', '바람막이', '반팔', '가젤', '블레이저', '포터리', '아디다스', '라퍼지스토어', '스투시', '나이키', '컨버스', '아식스', '반스', '맨투맨', '청바지', '로퍼', '반바지', '드레스', '백팩', '후드', '아노락', '트러커', '조거팬츠', '치마', '볼캡' ,'청자켓', '쿠어', '아크테릭스', '모드나인', '뉴발란스', '노매뉴얼', '엘무드', '세터', '토피', '미스치프', '마뗑킴', '살로몬', '파르티멘토', '칼하트', '코스', '유니클로', '르마드', '토니웩', '에스피오나지', '크록스' ];

export let options = {
  stages: [
    { duration: '2m', target: 50 },
    { duration: '3m', target: 60 },
    { duration: '5m', target: 82 },
    { duration: '10m', target: 0 },
  ],
};

function getRandomSearchKeyword() {
  return searchKeywords[Math.floor(Math.random() * searchKeywords.length)];
}

export default function () {
  const searchKeyword = getRandomSearchKeyword();
  const url = `https://stg.onthelook.co.kr/searchV3/result?q=${encodeURIComponent(searchKeyword)}&t=post&f={"gender":[],"height":[],"weight":[],"price":[1000,200000],"selectedCategory":"","selectedSubCategory":"","item":[],"tpo":[],"season":[],"mood":[],"color":[],"randomMood":"false","bodyType":[]}&vt=3&st=POPULAR_STYLE`;

  const res = http.get(url);

  check(res, {
    'status was 200': (r) => r.status === 200,
  });

  sleep(1);
}
