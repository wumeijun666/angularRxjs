import { Component, OnInit } from '@angular/core';
import {RequestService} from '../../services/request.service'
import { map,filter } from 'rxjs/operators';
@Component({ 
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private request:RequestService) { }

  ngOnInit() {
    // 同步方法
    let data = this.request.getData();
    console.log(data);
    // callback获取异步数据
    this.request.getCallbackData(function(a){
      console.log(a)
    });
    // promise获取异步数据 ES6
    var promiseData = this.request.getPromiseData();
    promiseData.then((data)=>{
      console.log("---"+data);
    }).catch(function(d){
      console.log("+++"+d);
    })
    // Rjxs 获取异步数据 

    // var rxjsData =  this.request.getRxjsData();
    // rxjsData.subscribe(function(data){
    //   console.log(data)
    // })

    // Rjxs 过一秒钟撤回刚才的操作 
    var streem =  this.request.getRxjsData();
    var d = streem.subscribe(function(data){
        console.log(data)
    })
    setTimeout(() => {
       d.unsubscribe();/* 取消订阅 */
    }, 1000);
    

    //异步Promise执行多次 (没有这个能力，只执行一次)
    var promistIntervalData = this.request.getPromiseIntervalData();
    promistIntervalData.then(data=>{
      console.log(data);
    })

    this.request.getRxjsIntervalData().subscribe(function(data){
      console.log(data);
    });

    // Rjxs 用工具方法对返回的数据进行封装处理
    var streemNumber = this.request.getRxjsIntervalNumber();
    streemNumber.pipe(
        filter(function(value){ // 表示过滤只要偶数
          if(value%2==0){
            return true;
          }
        }),
        map(function(value){ // 表示将过滤后的数据 进行处理，比如这里加个x，返回一个新的数据。
          return value+"x" // 应用场景比如服务器返回一个json字符串，可以通过map处理为js对象。
        })
    )
    .subscribe(data=>{ 
      console.log(data)
    })
  }

    
  

}
