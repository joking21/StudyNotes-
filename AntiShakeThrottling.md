## 使用场景
 * 用户可能连续点击时使用节流
 * API 调用时使用节流
 * mousemove 或 touchmove 事件回调时使用节流
 * resize 事件回调时使用防抖
 * scroll 事件回调时使用防抖
 * 一个自动保存功能中，保存函数使用防抖

## 防抖
 指触发事件后在n秒内只能执行一次，若在n秒内又触发该事件，则会重新计算函数执行时间
 ```javascript
 function debounce(func,wait){
  let timer;
  return function(){
    let context = this;
    let args = arguments;
    if(timer)  clearTimeout(timer);
    let callNow = !timer;  //记录计时器是否结束
    timer = setTimeout(()=>{
       time = null; 
    },wait);
    if(callNow){
         func.apply(context,args);
    }
  }
}
 ```

 ## 节流
 指连续触发的事件在n秒内只能执行一次
 ```javascript
 // 利用时间戳
 function throttle(func,wait){
　　let last = 0;//上次触发时间戳
　　return function(){
　　　　let contex = this;
　　　　let args = arguments;
　　　　let now = +new Date(); //当前时间戳
　　　　if(now - last>wait){ //时间间隔大于wait时执行
　　　　　　last = now;
　　　　　　func.apply(context,args);
　　　　}
　　}
}　

//利用定时器
function throttle(func,wait){
　　let timer;
　　return function(){
　　　　let context = this;
　　　　let args = arguments;
　　　　if(!timer){
　　　　　　timer = setTimeout(()=>{
　　　　　　　　timer = null;
　　　　　　　　func.apply(context,args)
　　　　　　},wait)
　　　　}
　　}
}
 ```