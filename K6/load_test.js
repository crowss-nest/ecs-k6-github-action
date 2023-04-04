import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 10 }, // 1분 동안 10명의 동시 사용자로 시작
    { duration: '2m', target: 50 }, // 2분 동안 동시 사용자를 50명까지 늘림
    { duration: '3m', target: 100 }, // 3분 동안 동시 사용자를 100명까지 늘림
    { duration: '1m', target: 0 }, // 마지막 1분 동안 동시 사용자를 0으로 줄임
  ],
};


export default function () {
  let res = http.get('http://poc-376430443.ap-northeast-2.elb.amazonaws.com'); // 여기에 테스트하려는 웹 사이트의 주소를 입력하세요

  check(res, {
    'status was 200': (r) => r.status == 200,
    'transaction time OK': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
