## 函数柯里化

### 箭头函数常用
* 以下常用于高阶组件
```javascript
const add = x => y => x + y;
add(x)(y);
```
## 不定参数
```javascript
const curry = (f, args1 = []) => (...args2) => {
  const args = [ ...args1, ...args2 ]
  return f.length === args.length
  ? f(...args)
  : curry(f, args)
}
const sum = curry((a, b, c, d) => a + b + c + d)
sum(1,2,3,4);
sum(1,2)(3,4);
sum(1)(2)(3)(4);
sum(1,2,3)(4);
```