## 关于css
 
 在每个vue页面里面写css的话，style标签必须加上scoped。不加scoped，这个页面一加载，里面的css会作用域整个项目。
 ```javascript
 <style scoped>
 
 </style>
 ```