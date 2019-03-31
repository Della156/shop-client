/*
* ajax 请求函数模块
* 返回值：promise 对象(异步返出的数据是：response.data)
*/
import axios from 'axios';
 //请求的三个条件：地址,参数，请求方式
 export default function ajax (url = '',data = {},type = 'GET') {

   return new Promise(function (resolve,reject) {//直接通过promise得到数据
     //执行异步ajax请求
     let promise;//声明一个promise
     if (type === 'GET') {
       // 准备 url query 参数数据
       let dataStr = ''; // 数据拼接字符串
       Object.keys(data).forEach(key => {
         dataStr += key + '=' + data[key] + '&'
       });
       if (dataStr !== '') {
         dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
         url = url + '?' + dataStr;
       }
       // 发送 get 请求
       promise = axios.get(url);
     } else {
       // 发送 post 请求
       promise = axios.post(url, data);
     }

     promise.then(function (response) {
       //成功了调用resolve()
         resolve(response.data);//返出的数据是response.data
     }).catch(function (error) {
       //失败了调用reject()
           reject(error);
       })



   })


     return promise;

 }
