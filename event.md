# event-发布订阅
```javascript
class EventEmitter {
  constructor() {
    this._events = new Map(); // 存储时间/回掉健值对
  }
  // 触发
  emit(type, ...args) {
    let handler;
    // 从存储事件健值对的this._events中获取对应事件回调函数
    handler = this._events.get(type);
    handler.forEach(item => {
      item && item.call(this, ...args);
    });
  }
  // 监听
  addListener(type, fn) {
    const handler = this._events.get(type);
    if (handler) {
      handler.push(fn);
    } else {
      this._events.set(type, [fn]);
    }
  }
  // 移除
  removeListener(type, fn) {
    const handler = this._events.get(type);
    let position;
    for (let i = 0; i < handler.length; i++) {
      if (handler[i] === fn) {
        position = i;
      } else {
        position = -1;
      }
    }
    // 如果找到匹配的函数，从数组中清除
    if (position !== -1) {
      // 找到数组中对应的位置，直接清除此回掉
      handler.splice(position, 1)
    }
  }
}
```