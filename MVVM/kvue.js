/*
 * @Author: dengWW
 * @Date: 2021-01-29 17:56:25
 * @LastEditors: dengWW
 * @LastEditTime: 2021-01-30 16:56:15
 * @Description: 
 */
function defineReactive(obj, key, val) {
  // 递归
  observe(val);
  // 创建一个Dep和当前的key一一对应
  const dep = new Dep()
  // 对传入的obj进行访问拦截
  Object.defineProperty(obj, key, {
    get() {
      console.log('get' + key)
      // 依赖收集在这里
      Dep.target && dep.addDep(Dep.target)

      return val
    },
    set(newVal) {
      if (newVal !== val) {
        console.log(`set${key}:${newVal}`)
        observe(newVal);
        val = newVal
        // 
        // watchers.forEach(w => w.update())
        dep.notify()
      }
    }
  })
}
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }
  // if(typeof obj === 'object'){
  //   Object.keys(obj).forEach(key => {
  //     defineReactive(obj, key, obj[key])
  //   })
  // }
  new Observer(obj);
}
function set(obj, key, val){
  defineReactive(obj, key, val)
}
// 代理函数，方便用户直接访问$data中的数据
function proxy(vm, sourceKey){
  Object.keys(vm[sourceKey]).forEach(key => {
    Object.defineProperty(vm, key, {
      get(){
        return vm[sourceKey][key]
      },
      set(newVal){
        vm[sourceKey][key] = newVal
      }
    })
  })
}
class KVue{
  constructor(options){
    console.log('options===',options)
    // 保存选项
    this.$options = options;
    this.$data = options.data;
    // 响应化处理
    observe(this.$data);
    // 代理
    proxy(this, '$data')
    // 创建编译器的实例
    new Compile(options.el, this);
  }
}
// 根据对象的类型决定如何做响应化
class Observer{
  constructor(value){
    this.value = value
    // 判断类型
    // 对象
    if(typeof value === 'object'){
      this.walk(value)
    }
  }
  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}
// 观察者:保存更新函数，值发生变化，调用更新函数
const watchers = []
class Watcher{
  constructor(vm, key, updateFn){
    this.vm = vm
    this.key = key
    this.updateFn = updateFn
    // watchers.push(this)
    // Dep.targe静态属性上设置为当前watcher实例
    Dep.target = this
    this.vm[this.key] // 读取触发了getter
    Dep.target = null // 收集完就置空
  }
  update(){
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

// Dep:依赖，管理某个key相关的所有watcher实例
class Dep{
  constructor(){
    this.deps = []
  }
  addDep(dep){
    this.deps.push(dep)
  }
  notify(){
    this.deps.forEach(dep => dep.update())
  }
}