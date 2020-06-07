/**
 * 利用Axios来处理异步请求
 */

import axios from 'axios';
import config from '../config';
import { IErrResponse } from '../model/response';
import history from '../utils/history';

// create an axios instance
const http = axios.create({
  withCredentials: false, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
})

http.defaults.baseURL = config.apiUrl;

http.defaults.headers = {
  'content-type': 'application/json'
}

// request interceptor
http.interceptors.request.use(
  conf => {
    return conf;
  },
  error => {
    // do something with request error
    return Promise.reject(error);
  }
)

// response interceptor
http.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 返回response.data，其它axios包装的数据不需要
    // 重写axios.d.ts，覆盖AxiosResponse
    const res = response.data;
    return res;
  },
  error => {
    const err = error.response;

    if (!err) {
      // 如果服务端未响应任何错误则抛出异常消息
      console.error('未知错误，请稍候再试！');
      return Promise.reject(error);
    }

    const errResponse = err.data as IErrResponse;

    console.error(`错误消息：${errResponse.message}`);
    return Promise.reject(error);
  }
)

export default http;
