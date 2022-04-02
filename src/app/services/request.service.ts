import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() { }
  // 同步方法
  getData(){
    return 'this is service data'
  }
 // 回调函数异步
  getCallbackData(cb){

     setTimeout(() => {
       var data = 'zs+callback';
       cb(data);
       //return data;
     }, 2000);
  }
  // Promise 异步 Es6提供
  getPromiseData(){
    return new Promise(function(resolve,reject){// resolve 成功回调函数 ， reject 失败回调函数
      console.log('start new Promise...');
      var timeOut = Math.random() * 2;
      console.log('set timeout to: ' + timeOut + ' seconds.');
      setTimeout(function () {
          if (timeOut < 1) {
              console.log('call resolve()...');
              resolve('200 OK');
          }
          else {
              console.log('call reject()...');
              reject('timeout in ' + timeOut + ' seconds.');
          }
      }, timeOut * 1000);
    })
  
  }

  // Rxjs提供
  getRxjsData(){
    return new Observable(function(observ){
        setTimeout(() => {
          let username = 'zs----Observable';
          observ.next(username); //传入正确的数据
         // observ.error(666); 错误数据的处理
        }, 3000);
    })
  }


  // 多次执行Promise 
  getPromiseIntervalData(){
    return new Promise((res,rej)=>{ // rej 可写可不写
      setInterval(function(){
          var username="张三----Promise N次"
          res(username);
      },1000)
    })
  }

  getRxjsIntervalData(){
    let count = 0
    return new Observable<any>(observ=>{
      setInterval(() => {
        observ.next("张三----Rxjs"+count+++" 次")
      }, 1000);
    })
  }
  // 使用 Rxjs 工具类测试
  getRxjsIntervalNumber(){
    let count = 0
    return new Observable<any>(observ=>{
      setInterval(() => {
        observ.next(count++)
      }, 1000);
    })
  }
}
