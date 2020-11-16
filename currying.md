## 函数柯里化

### 箭头函数常用
* 以下常用于高阶组件
```javascript
const add = x => y => x + y;
add(x)(y);
```
```javascript
function sum () {
  const cur = [].slice.call(arguments).reduce(function(a,b){
    return a + b;
  }, 0)
  function innerSum() {
   const next = [].slice.call(arguments).reduce(function(a,b){
    return a + b;
   }, 0)
    cur += next;
    return innerSum;
  } 
  innerSum.toString = function(){
    return cur;
  }
  return innerSum;
}
sum(1,2,3,4);
sum(1,2)(3,4);
sum(1)(2)(3)(4);
sum(1,2,3)(4);
```