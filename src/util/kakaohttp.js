
import axios from 'axios';
//import searchKey from '../password/passwords.js'
 // axios 객체 생성
 export default axios.create({
   baseURL: 'https://dapi.kakao.com/v2/local/search/',
   headers: {
     'Content-type': 'application/json',
      'Authorization': 'KakaoAK 8be8f0420d797f689b5af06cf9fa297b',
     //  'Authorization': `KakaoAK ${searchKey}`,
   },
 });
 