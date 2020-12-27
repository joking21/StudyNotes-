# 重绘和回流
 ## 浏览器渲染机制
   1. 浏览器使用流式布局模型（FLow Based Layout）.
   2. 浏览器会把HTML解析成DOM, 把css解析成CSSOM,DOM和CSSOM就合成了Render Tree.
   3. 有了RenderTree,我们就知道了所有节点的样式，然后计算它们在页面上的大小和位置，最后把节点绘制到页面上.
   4. 由于浏览器使用流式布局，对RenderTree的计算通常只需要遍历一次就可以完成，但table及其内部元素除外，它们可能需要多次计算，通常要花3倍同等元素的时间，这就是为什么要避免使用table的原因之意。
### 回流（Reflow）
   当RenderTree中部分或全部元素的尺寸，结构，或某些属性发生变化时，浏览器重新渲染部分或全部文档的过程称为回流。
   
   会导致回流的操作：
  - 页面首次渲染
  - 浏览器窗口大小发生改变
  - 元素尺寸或位置发生改变
  - 元素内容变化（文字数量或图片大小等）
  - 元素字体大小变化
  - 添加或删除可见的DOM元素
  - 激活css伪类（例如 :hover）
  - 查询某些属性或调用某些方法

  一些常用且会导致回流的属性和方法

  - clientWidth、clientHeight、clientTop、clientLeft
  - offsetWidth、offsetHeight、offsetTop、offsetLeft
  - scrollWidth、scrollHeight、scrollTop、scrollLeft
  - scrollIntoView()、scrollIntoViewIfNeeded()
  - getComputedStyle()
  - getBoundingClientReact()
  - scrollTo()

  ### 重绘（Repaint）
  当页面中元素样式的改变并不影响它在文档流中的位置时（如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。

  ## 性能影响
   - 回流比重绘的代价要更高。

   有时即使仅仅回流一个单一的元素，它的父元素以及任何跟随它的元素也会产生回流。
   现代浏览器会对频繁的回流和重回操作进行优化：
   浏览器会维护一个队列，把所有引起回流和重绘的操作放入队列中，如果队列中的任务数量或者时间间隔达到一个阀值，浏览器就会将队列清空，进行一次批处理，这样可以把多次回流和重绘变成一次。

   当你访问以下属性或方法时，浏览器会立刻清空队列：
  - clientWidth、clientHeight、clientTop、clientLeft
  - offsetWidth、offsetHeight、offsetTop、offsetLeft
  - scrollWidth、scrollHeight、scrollTop、scrollLeft
  - width、height
  - getComputedStyle()
  - getBoundingClientReact()
因为队列中可能会有影响到这些属性或方法返回值的操作，即使你希望获取的信息与队列中操作引发的改变无关，浏览器也会强行清空队列，确保你拿到的值是最精确的。

## 如何避免
 ### css
 - 避免使用table布局
 - 尽可能在DOM树的最末端改变class
 - 避免设置多层内联样式
 - 将动画效果应用到position属性为absolute或fixed的元素上。
 - 避免使用css表达式（例如：calc()）.
 ### javascript
 - 避免频繁操作样式，最好一次性重写style属性，或者将样式列表定义为class并一次性更改class属性
 - 避免频繁操作DOM，创建一个documentFragment，在它上面应用所有的DOM操作，最后再把它添加到文档中
 - 也可以先为元素设置display:none,操作结束后再把它显示出来，因为在display属性为none的元素上进行的DOM操作不会引发回流和重绘
 - 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存
 - 对具有复杂动画的元素使用绝对定位，使它脱离文档流，否则会引起父元素及后续元素频繁回流

 # 水平垂直居中
  ## 水平居中
  ### 行内：text-align:center
  ### 块级：
  ```css
  margin:0 auto;
  ```
   ```css
  position:absolute;
  left:50%;
  margin-left:-50%;
  ```
  ```css
  position:absolute;
  transform:translate(-50%,0);
  ```
  ```css
  display:flex; 
  justify-content: center;
  ```
 

## 垂直居中：
### 行内：line－height:height
### 块级：
#### 设置table
  父：
  ```css 
  display:table; 
  ```
  子： 
   ```css 
  display:table-cell;
  vertical-align:middle
  ```
  
#### flex
```css
 display: flex;
 align-items: center;
```

# flex布局 
http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html
- 设为flex布局以后，子元素的float、clear和vertical-align属性将失效

# position
 - static 
 该关键字指定元素使用正常的布局行为，及元素在文档常规流中当前的布局位置。此时top,right,bottom,left和z-index属性无效。
 - relative
 该关键字下，元素先放在未添加定位时的位置，在不改变页面布局的前提下，调整元素位置（因此会在此元素未添加定位时所在位置留下空白）。
 对table-group,table-row,table-column,table-cell,table-caption元素无效
 - absolute
 元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的非static定位祖先元素的偏移，来确定元素位置，绝对定位元素可以设置外边距（margin）,  且不会与其他边距合并
 - fixed
 元素会被移出正常文档流，并不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在每页的固定位置。fixed属性会创建层叠的上下文，当元素祖先的transform,perspective或filter属性非None时，容器由视口改为该祖先的
 - sticky
 元素根据正常文档流进行定位，然后相对于它的最近滚动祖先，和最近块级祖先。基于top,right,bottom,left进行偏移。偏移值不会影响任何其他元素的值。

 # css3动画
 - animation
 - @keyframes

 # BFC & 清除浮动

 ## BFC (Block Formatting Context)块格式化上下文
 是web页面的可视化css渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。
 ### 以下会创建块格式化上下文
 - html 根元素
 - float (不为none即可) left,right
 - position: absolute | fixed
 - display: inline-block | flex | inline-flex | grid | inline-grid | table | table-cell | table-caption | flow-root
 - overflow值不为visible的块元素
 块格式化上下文对浮动定位与清除浮动（clear）都很重要
 ## 总结
 - 浮动定位和清除浮动时只会应用于同一个BFC的元素，浮动不会影响其它BFC中元素的布局
 - 而清除浮动只能清除同一BFC中在它前面的元素的浮动
 - 外边距折叠（margin collapsing）也只会发生在属于同一BFC的块级元素之间
 - BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
 - 计算BFC的高度时，考虑BFC所包含的所有元素，连浮动元素也参与计算
 - 浮动盒区域不折叠到BFC上

 ## 高度坍塌和清除浮动

 ### 高度坍塌指父元素本来应该包括子元素的高度，但是实际上父元素比子元素的高度要小
 ### 外边距折叠
 块级元素的上外边距和下外边距有时会合并（或折叠）为一个外边距，其大小取其中的最大值，这种行为称为外边距折叠。注意浮动元素和绝对定位元素的外边距不会折叠。
 ### 去除外边距折叠的方法
 - 父元素添加边框（border）
 - 父元素添加内边距（padding）
 - 父子元素之间存在行内元素<span>匿名元素
 - 父子元素之间存在触发BFC的元素（插入一个display: flex的块级元素）
 - 父元素触发BFC（overflow: auto等）
 ### 外边距折叠的一些规则
 - 即使某一外边距为0，这些规则仍然适用。因此就算父元素的外边距是0，第一个或最后一个子元素的外边距仍然会“溢出”到父元素的外面
 - 如果参与折叠的外边距中包含负值，折叠后的外边距的值为最大的正边距和最小的父边距的和   （？？）
 - 如果所有参与折叠的外边距都为负，折叠后的外边距的值为最小的负边距的值。这一规则适用于相邻元素和嵌套函数

# css预处理器

- sass
- less

# 盒模型
 - box－sizing： content-box（width宽度就是内容区域宽度，不包含padding和border）(标准盒模型)
 - box-sizing: border-box (width宽度＝内容宽度＋border＋padding)(怪异盒模型)

# css选择器

# 响应式布局

- 媒体查询 @media
- 百分比布局
- rem 布局
- flex

# 实现三角形 (利用border)
```css
.test2{
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-top-color: black;
    }
```


