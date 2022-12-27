//  1. 实现一个Storage
class Storage {
  static getInstance() {
    // 判断是否已经new过1个实例
    if (!Storage.instance) {
      Storage.instance = new Storage();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return Storage.instance;
  }
  getItem(key) {
    return this[key];
  }
  setItem(key, value) {
    return (this[key] = value);
  }
}
const storage1 = Storage.getInstance();
const storage2 = Storage.getInstance();
storage1.setItem('name', '李雷');
// 李雷
let a = storage1.getItem('name');
console.log(a);
// 也是李雷
let b = storage2.getItem('name');
console.log(b);
console.log(storage1 === storage2);

// ----------------------------------- -----------------------------
//闭包版本

function StorageBase() {
  StorageBase.prototype.getItem = function (key) {
    return localStorage.getItem(key);
  };

  StorageBase.prototype.setItem = function (key, value) {
    return localStorage.setItem(key, value);
  };
}
const Storage = (function () {
  let instance = null;
  return function () {
    //判断自由变量是否为null
    if (!instance) {
      instance = new StorageBase();
    }
    return instance;
  };
})();
// 这里其实不用 new Storage 的形式调用，直接 Storage() 也会有一样的效果 
const storage3 = new Storage()
const storage4 = new Storage()
storage3.setItem('name', '李雷')
// 李雷
storage3.getItem('name')
// 也是李雷
storage4.getItem('name')

// 返回true
storage3 === storage4

// 实现一个全局的模态框



