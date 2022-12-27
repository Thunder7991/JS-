//单例模式
//保证一个类仅有一个实例，并提供一个访问它的全局访问点

class SingleDog {
  show() {
    console.log('我是一个单例模式!');
  }

  static getInstance() {
    //判断是否new过这个实例
    if (!SingleDog.instance) {
      SingleDog.instance = new SingleDog();
    }
    // 如果这个唯一的实例已经存在，则直接返回
    return SingleDog.instance;
  }
}
const s1 = new SingleDog();
const s2 = new SingleDog();
console.log(s1 === s2); // false

const s3 = SingleDog.getInstance();
const s4 = SingleDog.getInstance();
console.log(s3 === s4); //true
console.log(s3 instanceof SingleDog); //true

// 闭包实现 单例模式

SingleDog.getInstance = (function () {
  //定义自由变量instance , 模拟私有变量
  let instance = null;
  return function () {
    // 判断自由变量是否为null
    if (!instance) {
      // 如果为null则new出唯一实例
      instance = new SingleDog();
    }
    return instance;
  };
})();
const s5 = SingleDog.getInstance;
const s6 = SingleDog.getInstance;
console.log(s5 === s6); //true

// vuex 中的单例模式

let Vue // 这个Vue的作用和楼上的instance作用一样
export function install (_Vue) {
  // 判断传入的Vue实例对象是否已经被install过Vuex插件（是否有了唯一的state）
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  // 若没有，则为这个Vue实例对象install一个唯一的Vuex
  Vue = _Vue
  // 将Vuex的初始化逻辑写进Vue的钩子函数里
  applyMixin(Vue)
}

