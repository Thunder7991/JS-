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
  console.log('肉骨头真好吃');
};
// 每个构造函数都有一个prototype属性 , 它指向构造函数的原型对象 , 这个原型对象中有一个 constructor 属性指回构造函数;

// 每个实例都有一个__proto__属性 , 使用构造函数去创建实例 , 实例的__proto__属性就会指向构造函数的原型对象;
let smallDog = new Dog();
console.log('__proto__:指向构造函数的原型对象:', smallDog.__proto__);
console.log('prototype构造函数的原型对象:', Dog.prototype);
console.log(Dog.prototype === smallDog.__proto__);

//回顾回顾原型链




