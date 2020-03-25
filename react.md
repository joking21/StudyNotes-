## react中key的作用是什么？

Key是React用于追踪哪些列表中元素被修改，被添加或者被移除的辅助标识。

## 调用setState之后发生了什么？

在代码中调用setSate函数之后，React会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程(Reconciliation)。经过调和过程，React会以相对高效的方式根据新的状态构建React元素树并且着手重新渲染整个UI界面。在React得到元素树之后，React会自动计算出新的树和老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异化计算算法中，React能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

## react生命周期函数

* 初始化阶段：
1. getDefaultProps: 获取实例的默认属性
2. getInitialState: 获取每个实例的初始化状态
3. componentWillMount: 组件即将被卸载，渲染到页面上
4. render: 组件在这里生成虚拟的DOM节点
5. componentDidMount: 组件真正在被装载之后

* 运行中状态：
1. componentWillReceiveProps: 组件将要接收到属性的时候调用
2. shouldComponentUpdate: 组件接受到新属性或者新状态的时候（可以返回false, 接收数据后不更新，阻止render调用，后面的函数不会被继续执行了）
3. componentWillUpdate: 组件即将更新不能修改属性和状态
4. render 组件重新描绘

* 销毁阶段

1. componentWillUnmount：组件即将销毁

## shouldComponentUpdate 是做什么得，（react性能优化是哪个周期函数）

shouldComponentUpdate判断是否需要调用render方法重新描绘dom。因为dom得描绘非常消耗性能，如果我们能在shouldComponentUpdate方法中能够写出更优化的dom diff算法，可以极大的提高性能。

## 为什么虚拟dom会提高性能？

虚拟dom相当于在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高性能。

用javascript对象结构表示DOM树的结构，然后用这个树构建一个真正的DOM树，插到文档当中当状态变更的时候，重新构造一棵树的新对象。然后用新的树和旧的树进行比较，记录两棵树的差异，把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了。

## react diff原理

1. 把树形结构按照层级分解，只比较同级元素。
2. 给列表结构的每个单元添加唯一的key属性，方便比较。
3. React只会匹配相同的class的component(这里的class指的是组件的名字)
4. 合并操作，调用component和setState方法的时候，React将其标记为dirty，到每一个事件循环结束，React检查所有标记的dirty的component重新绘制。
5. 选择性子树渲染。开发人员可以重写shouldComponentUpdate提高diff的性能。

## React中refs的作用是什么？

Refs是React提供给我们的安全访问DOM元素或者某个组件实例的句柄。我们可以为元素添加ref属性，然后在回调函数中接受该元素在DOM树中的句柄，该值会作为回调函数的第一个参数返回。
```javascript
<ul  ref={(container) => { this.container = container }}>

</ul>
```
refs并不是类组件的专属，函数式组件同样能够利用闭包暂存其值。
