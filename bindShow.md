# 绑定this，显示的有call,apply,bind

# 实现
```javascript
/**
 * 1.将函数设为对象的属性
 * 2.执行&删除这个函数
 * 3.指定this到函数并传入给定参数执行函数
 * 4.如果不传入参数，默认指向为window
 */
Function.prototype.myCall = function(context, ...args){
  // context.fn = this;
  // let args = [];
  // for(let i = 1, len = arguments.length; i<len; i++){
  //   args.push(arguments[i])
  // }
  // context.fn(...args);
  // let result = context.fn(...args);
  // delete context.fn;
  // return result;
  let context = context || window;
  let fn = Symbol('fn');
  context.fn = this;
  let result = eval('context.fn(...args)');
  delete context.fn;
  return result;
}

Function.prototype.myApply = function(context, args){
  let context = context || window;
  context.fn = this;
  let result = eval('context.fn(...args)');
  delete context.fn;
  return result;
}
/**
 * 1.返回一个函数，绑定this,传递预置参数
 * 2.bind返回的函数可以作为构造函数使用。故作为构造函数时，应使得this失效，但是传入的参数依然有效
 */
Function.prototype.myBind = function(context, ...args){
  if(typeof this !== "function"){
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }
  let self = this;
  let fbound = function(){
    self.apply(this instanceof self ? this : context,
      args.concat(Array.prototype.slice.call(arguments))
      )
  }
  fbound.prototype = Object.create(self.prototype);
  return fbound;
}
```