import { check, sleep } from 'k6';
import http from 'k6/http';

export let options = {
  stages: [
    { duration: '1m', target: 1 },
  ],
};


const searchKeywords = ['점퍼', '가디건', '폴로', '셔츠', '데님팬츠', '카고팬츠', '바람막이', '반팔', '가젤', '블레이저', '포터리', '아디다스', '라퍼지스토어', '스투시', '나이키', '컨버스', '아식스', '반스', '맨투맨', '청바지', '로퍼', '반바지', '드레스', '백팩', '후드', '아노락', '트러커', '조거팬츠', '치마', '볼캡', '청자켓', '쿠어', '아크테릭스', '모드나인', '뉴발란스', '노매뉴얼', '엘무드', '세터', '토피', '미스치프', '마뗑킴', '살로몬', '파르티멘토', '칼하트', '코스', '유니클로', '파타고니아', '프라다', '라코스테', '디올', '루이비통'];

function getRandomSearchKeyword() {
  return searchKeywords[Math.floor(Math.random() * searchKeywords.length)];
}

function getRandomPostId(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mutation = `mutation UpdatePost($postId: Int!, $images: [String!]!, $products: [UpdateProductInput!]!, $postItemPoint: [UpdatePostItemPointInput!]!, $styleTagIds: [Int!]!, $detail: String!) {
  UpdatePost(postId: $postId, images: $images, products: $products, postItemPoint: $postItemPoint, styleTagIds: $styleTagIds, detail: $detail) {
    ok
    error
  }
}`

function requestSearchResults(searchKeyword, offset, limit) {
  const searchUrl = `https://stg.onthelook.co.kr/searchV3/result?q=${encodeURIComponent(searchKeyword)}&t=post&f={"gender":[],"height":[],"weight":[],"price":[1000,200000],"selectedCategory":"","selectedSubCategory":"","item":[],"tpo":[],"season":[],"mood":[],"color":[],"randomMood":"false","bodyType":[]}&vt=3&st=POPULAR_STYLE&offset=${offset}&limit=${limit}`;
  
  const searchRes = http.get(searchUrl);

  check(searchRes, {
    'search status was 200': (r) => r.status === 200,
  });

  console.log(`요청 URL: ${searchUrl}\n검색어: ${searchKeyword}, 상태코드: ${searchRes.status}`);
  return searchRes;
}

 export default function () {
   const searchKeyword = getRandomSearchKeyword();
   let offset = 0;
   const limit = 20;
  
// Request search results with pagination (incrementing offset by limit)
let searchRes;
let lastPage = false;
while (!lastPage) {
  searchRes = requestSearchResults(searchKeyword, offset, limit);
  
  if (searchRes.status !== 200) {
    console.log(`Unexpected response status: ${searchRes.status}`);
    lastPage = true;
  } else {
    let responseData;
    try {
      responseData = searchRes.json();
    } catch (error) {
      console.error(`JSON parsing error: ${error.message}\nResponse body: ${searchRes.body}`);
      lastPage = true;
    }

    if (responseData && responseData.data.length < limit) {
      lastPage = true;
    } else {
      offset += limit;
      sleep(1);
    }
  }
}
  
   const postId = getRandomPostId(100, 117678);
   const postUrl = `https://stg.onthelook.co.kr/post/${postId}`;
  
   const postRes = http.get(postUrl);
  
   check(postRes, {
     'post status was 200': (r) => r.status === 200,
   });
 
   console.log(`검색어: ${searchKeyword}\n 포스트 URL: ${postUrl}\n포스트 ID: ${postId}\n상태코드: ${postRes.status}`);
   sleep(1);
 }
