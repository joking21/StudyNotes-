
## react源码解析  https://react.jokcy.me/

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

## 展示组件（Presentational component）和容器组件(Container component)之间有何不同

* 展示组件关心组件看起来是什么。展示专门通过props接受数据和回调，并且几乎不会有自身的状态，但当展示组件拥有自身的状态时，通常也只关心UI状态，而不是数据的状态。
* 容器组件则更关心组件是如何运作的。容器组件会为展示组件或者其它容器组件提供数据和行为,他们会调用Flux actions,并将其作为回调提供给展示组件。容器组件经常是有状态的，因为它们是（其它组件的）数据源。

## 类组件（Class component）和函数式组件(Functional component)之间有何不同

* 类组件不仅允许你使用更多额外得功能，如组件自身得状态和生命周期钩子，也能使组件直接访问store并维持状态
* 当组件仅是接收props，并将组件自身渲染到页面时，该组件就是一个‘无状态组件（stateless component）’,可以使用一个纯函数来创建这样的组件。这种组件也被称为哑组件（dumb components）或展示组件

## 组件的状态(state)和属性(props)之间有何不同

* State是一种数据结构，用于组件挂载时所需数据的默认值。State可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果。
* Props则是组件的配置。props由父组件传递给子组件，并且就子组件而言，props是不可变的(immutable)。组件不能改变自身的props，但是可以把其子组件的props放在一起（统一管理）。props也不仅仅是数据--回调数据也可以通过props传递。

## state为什么是异步的

* 保证内部的一致性（因为props是要等到父组件渲染过后才能拿到，也就是不能同步更新，state出于统一性设成异步更新）
* 性能优化（举例说你正在一个聊天窗口输入，如果来了一条新消息又要render，那就会阻塞你的当前操作，导致延迟什么的）。
* 支持state在幕后渲染（异步可以使state在幕后更新，而不影响你当前旧的页面的交互，提升用户体验）

## 受控组件（controlled component）

在html种，类似``<input>, <textarea>和<select>`` 这样的表单元素会维护自身的状态，并基于用户的输入来更新。当用户提交表单时，前面提到的元素的值将随表单一起被发送，但在React中会有些不同，包含表单元素的组件将会在state中追踪输入的值，并且每次调用回调函数时，如onChange会更新state,重新渲染组件。一个输入表单元素，它的值通过React的这种方式来控制，这样的元素就被称为"受控元素"。

## 高阶组件(higher order component)

高阶组件是一个以组件为参数并返回一个新组件的函数。HOC运行你重用代码，逻辑和引导抽象。最常用的可能是Redux的connect函数。除了简单分享工具库和简单的组合，HOC最好的方式是共享React组件之间的行为。如果你发现你在不同的地方写了大量代码来做同一件事时，就应该考虑将代码重构为可重用的HOC.

## 为什么建议传递给setState的参数是一个callback而不是一个对象

因为this.props和this.state的更新可能是异步的，不能依赖它们的值去计算下一个state。

## （在构造函数中）调用super(props)的目的是什么

在super()被调用之前，子类是不能使用this的，在ES2015中，子类必须在constructor中调用super()。传递props给super()的原因是便于(在子类中)能在constructor访问this.props。

## 应该在React组件的何处发起Ajax请求

在React组件中，应该在componentDidMount中发起网络请求。这个方法会在组件第一次“挂载”(被添加到DOM)时执行，在组件的生命周期中仅会执行一次。更重要的是，你不能保证在组件挂载之前Ajax请求已经完成，如果是这样，也就意味着你将尝试在一个未挂载的组件上调用setState，这将不起作用。在componentDidMount中发起网络请求将保证这有一个组件可以更新了。

## createElement和cloneElement有什么区别？

* React.createElement(): JSX语法就是用React.createElement()来构建React元素的。它接受三个参数，第一个参数可以是一个标签名。如div,span,或者React组件。第二个参数为传入的属性。第三个以及之后的参数，皆作为组件的子组件。
```javascript
React.createElement(
    type,
    [props],
    [...children]
)
```
* React.cloneElement()与React.createElement()相似，不同的是它传入的第一个参数是一个React元素，而不是标签名或组件。新添加的属性会并入原有的属性，传入到返回的新元素中，而旧的子元素将被替换。
```javascript
React.cloneElement(
    element,
    [props],
    [...children]
)
```
## React中有三种构建组件的方式

React.createClass(), ES6 class和无状态函数

## React组件的划分 业务组件+技术组件

* 根据组件的职责通常把组件分为UI组件和容器组件。
* UI组件负责UI的呈现，容器组件负责管理数据和逻辑。
* 两者通过两者通过React-Redux提供connect方法联系起来。

## redux

* redux是一个应用数据流框架，主要是解决了组件间状态共享的问题，原理是集中式管理，主要有三个核心方法，action,store,reducer,工作流程是view调用store的dispatch接收action传入store，reducer进行state操作，view通过store提供的getState获取最新的数据