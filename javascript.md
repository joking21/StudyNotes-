# 内存泄露
http://www.ruanyifeng.com/blog/2017/04/memory-leak.html
不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）。
## GC原理(垃圾回收机制)
- 找出不再使用的变量，然后释放掉其占用的内存，但是这个过程不是实时的，因为其开销比较大，所以垃圾回收器会按照固定的时间间隔周期性的执行。

### 什么是垃圾
一般来说没有被引用的对象就是垃圾，就是要被清除， 有个例外如果几个对象引用形成一个环，互相引用，但根访问不到它们，这几个对象也是垃圾，也要被清除。
 
 ### 1.标记清除, 2.引用计数
 * 垃圾回收器获取根并“标记”(记住)它们。
 * 然后它访问并“标记”所有来自它们的引用。
 * 然后它访问标记的对象并标记它们的引用。所有被访问的对象都被记住，以便以后不再访问同一个对象两次。
 * 以此类推，直到有未访问的引用(可以从根访问)为止。
 * 除标记的对象外，所有对象都被删除。

 ## 原因
 - 闭包
 - 循环引用
 - dom事件
 - 全局变量

 # es6语法

 # 原型链

# [模块化](modelues.md)

# [事件代理](CaptureAndBubble.md)

# [事件循环机制](EventLoop.md)

# [跨域](domain.md)

# 继承
 ## 原型链继承
 - 优点
   * 父类方法可以复用
 - 缺点
   * 父类的引用属性会被所有子类实例所共享
   * 子类构造实例时不会像父类传递参数

```javascript
function SuperType(){
  this.name = 'super1'
}
SuperType.prototype.age = function(){
  console.log('年龄1')
}
function SubType (){

}
SubType.prototype = new SuperType()
SubType.prototype.constructor = SubType;
const a = new SubType();
console.log(a.name)
a.age()
```

## 构造函数继承
 核心：将父类构造函数的内容复制给了子类的构造函数。这是所有继承中唯一一个不涉及到prototype的继承

```javascript
function SuperType(){
  this.name = 'super1'
}
SuperType.prototype.age = function(){
  console.log('年龄1')
}
function SubType (){
//  SuperType.call(this)
    SuperType.apply(this)
//  SuperType.bind(this)()
}
const a = new SubType();
console.log(a.name)
a.age() //报错
```
- 优点  和原型链继承完全反过来
    * 父类的引用属性不会被共享
    * 子类构建实例时可以向父类传递参数
- 缺点
    * 父类的方法不能复用，子类实例的方法每次都是单独创建的


## 组合继承
核心： 原型式继承和构造函数继承的组合，兼具了二者的优点
```javascript
function SuperType(){
  this.name = 'super1'
}
SuperType.prototype.age = function(){
  console.log('年龄1')
}
function SubType (){
 SuperType.call(this)
}
SubType.prototype = new SuperType()
const a = new SubType();
console.log(a.name)
a.age()
```
- 优点
    * 父类的方法可以被复用
    * 父类的引用属性不会被共享
    * 子类构建实例时可以向父类传递参数
- 缺点
    * 调用了两次父类的构造函数，第一次给子类的原型添加了父类的name,age属性，第二次又给子类的构造函数添加了父类的name,age属性，从而覆盖了子类原型中的同名参数，这种被覆盖的情况造成了性能上的浪费

## 原型式继承
核心： 原型式继承的object方法本质上是对参数对象的一个浅复制。

```javascript
function object(o){
  function F(){}
  F.prototype = o;
  return new F;
}
let person = {
  name: 'joking',
  friends: ['joking1', 'joking2', 'joking3']
}
let anotherPerson = object(person);
anotherPerson.name = 'WW';
anotherPerson.friends.push('rob');

let yetPerson = object(person);
yetPerson.name = 'DD';
anotherPerson.friends.push('DW');
console.log(person) // {name: 'joking',friends: ['joking1', 'joking2', 'joking3', 'rob', 'DW']} --这儿可以说明是个浅复制
```
- 优点
   * 父类方法可以复用
- 缺点
   * 父类的引用属性会被所有子类实例共享
   * 子类构建实例时不能向父类传递参数

- ECMAScript5通过新增Object.create()方法规范了原型式继承，这个方法接收两个参数，一个用作新对象原型的对象和（可选的）一个为新对象定义额外属性的对象。在传入一个参数的情况下，Object.create()与object()方法的行为相同

所以上面的代码可以转变为
```javascript 
let yetPerson = object(person); => let yetPerson = Object.create(person); 
```

## 寄生组合继承
```javascript
function inheritPrototype(subType, superType){
  let prototype = Object(superType.prototype); //创建了父类原型的浅复制
  prototype.constructor = subType // 修正原型的构造函数
  subType.prototype = prototype;
}
function SuperType(name){
  this.name = name;
  this.colors = ['red', 'yellow', 'blue']
}
SuperType.prototype.sayName = function(){
  console.log(this.name)
}
function SubType(name, age){
  SuperType.call(this, name)
  this.age = age
}
// 以为是对父类原型的复制，所以不包含父类的构造函数，也就不会调用两次父类的构造函数造成浪费
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function(){
  console.log(this.age)
}
const a = new SubType('mingzi', 12)
a.sayName();
a.sayAge()
```

## ES6的继承与寄生组合继承类似
### ES6与ES5继承的异同
- 相同点
   * 本质上ES6继承是ES5继承的语法糖
- 不同点
   * ES6继承中子类的构造函数的原型链指向父类的构造函数，ES5中使用的是构造函数的复制，没有原型链的指向
   * ES6子类实例的构建，基于父类实例，ES5中不是

# [防抖和节流](AntiShakeThrottling.md)

# js基础数据类型，判断是否是数组

# new一个新对象
1. 创建一个空对象,将引用赋值，继承函数原型
2. 通过this将属性和方法添加至这个对象
3. 最后返回this指向的新对象，也就是实例

# 异步并发实现

# 函数式编程

# 高阶函数

# 函数柯里化和偏函数
