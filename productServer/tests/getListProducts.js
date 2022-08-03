import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 10,
  duration: '30s',
};



export default function () {


  http.get('http://localhost:3000/products?page=6&count=3',);

  sleep(1);
}