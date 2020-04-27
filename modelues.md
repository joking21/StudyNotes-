## import和require都是被模块化使用

### 1. 
  * require是CommonJs的语法（AMD规范引入方式），CommonJs的模块是对象。
  * import是es6的一个语法标准（浏览器不支持，本质是使用node中的babel将es6转码为es5再执行，import会被转码为require），es6模块不是对象

 ### 2
  * require是运行时加载整个模块（即模块中所有方法），生成一个对象，再从对象上读取它的方法（只有运行时才能得到这个对象,不能在编译时做到静态化），理论上可以用在代码的任何地方
  * import是编译时调用，确定模块的依赖关系，输入变量（es6模块不是对象，而是通过export命令指定输出代码，再通过 import输入，只加载import中导的方法，其他方法不加载），import具有提升效果，会提升到模块的头部（编译时执行）
  * export和import可以位于模块中的任何位置，但是必须是在模块顶层，如果在其他作用域内，会报错。es6这样的设计可以提高编译器效率，但没法实现运行时加载

  ### 
  * require是赋值过程，把require的结果（对象，数字，函数等），默认是export的一个对象，赋给某个变量（复制或浅拷贝）
  * import是解构过程（需要谁，加载谁）

     写法：

### require/exports（仅有下面的三种简单写法）
```javascript
    const a=require('a')      //真正被require出来的是来自module.exports指向的内存块内容
    exports.a=a             //exports 只是 module.exports的引用，辅助module.exports操作内存中的数据
    module.exports=a
```
### import / export
```javascript
          import a from 'a'

          import { default as a  } from 'a'

          import  *  as a  from 'a'

          import { fun1,fun2 } from 'a'

          import { fun1 as myfunction  } from 'a'

          import a, { fun1  } from 'a'

---------------------------------------------------------

           export default a

           export const a=1

           export functon a{ }

           export { fun1,fun2 }

           export * from 'a'
---------------------
```