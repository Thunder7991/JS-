// 原型模式
//他不仅仅是一种设计模式,更是一种编程范式 , 是 JavaScript 面向对象系统实现的根基

// js 中的类

// class Dog {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   eat() {
//     console.log('肉骨头真好吃')
//   }
// }
//  ======> 等价于
function Dog(name, age) {
  this.name = name;
  this.age = age;
}
Dog.prototype.eat = function () {
  console.log(this.name, '肉骨头真好吃');
};
// 每个构造函数都有一个prototype属性 , 它指向构造函数的原型对象 , 这个原型对象中有一个 constructor 属性指回构造函数;

// 每个实例都有一个__proto__属性 , 使用构造函数去创建实例 , 实例的__proto__属性就会指向构造函数的原型对象;
let smallDog = new Dog('小黑子', 3);
console.log('__proto__:指向构造函数的原型对象:', smallDog.__proto__);
console.log('prototype构造函数的原型对象:', Dog.prototype);
console.log(Dog.prototype === smallDog.__proto__);

//回顾回顾原型链
smallDog.eat();
console.log(smallDog.toString());
//详情见图片

//对象深拷贝
let liLei = {
  name: 'lilei',
  age: 28,
  habits: ['coding', 'hiking', 'running'],
};

const liLeiStr = JSON.stringify(liLei);
const liLeiCopy = JSON.parse(liLeiStr);
liLeiCopy.habits.splice(0, 1);
console.log('李雷副本的habits数组是', liLeiCopy.habits);
console.log('李雷的habits数组是', liLei.habits);

// 案例
function deepClone(obj) {
  // 如果是 值类型 或 null，则直接return
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // 定义结果对象
  let copy = {};

  // 如果对象是数组，则定义结果数组
  if (obj.constructor === Array) {
    copy = [];
  }

  // 遍历对象的key
  for (let key in obj) {
    // 如果key是对象的自有属性
    if (obj.hasOwnProperty(key)) {
      // 递归调用深拷贝方法
      copy[key] = deepClone(obj[key]);
    }
  }

  return copy;
}
console.log(56, deepClone({ a: 1 }));
