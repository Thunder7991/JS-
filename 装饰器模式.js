/*
 * @Author: thunderchen
 * @Date: 2023-01-26 17:25:29
 * @LastEditTime: 2023-01-26 18:42:00
 * @email: 853524319@qq.com
 * @Description:  装饰器模式
 */

//对 ./单例模式-全局Modal弹框.html 中的逻辑进行抽离
const Modal = (function () {
  let modal = null;
  return function () {
    if (!modal) {
      modal = document.createElement('div');
      modal.innerHTML = '我是一个全局唯一的Modal';
      modal.id = 'modal';
      modal.style.display = 'none';
      document.body.appendChild(modal);
    }
    return modal;
  };
})();

//将展示Modal的逻辑单独封装
function openModel() {
  const modal = new Modal();
  modal.style.display = 'block';
}

//编写新的逻辑
function changeButtonText() {
  const btn = document.getElementById('open');
  btn.innerText = '快去登录';
}

//按钮置灰逻辑
function disableButton() {
  const btn = document.getElementById('open');
  btn.setAttribute('disabled', true);
}

//新版本功能逻辑整合
function changeButtonStatus() {
  changeButtonStatus();
  disableButton();
}

// 然后将这个三个操作添加到open按钮监听函数里:
document.getElementById('open').addEventListener('click', () => {
  openModel();
  changeButtonStatus();
});

/*************** ES6实现******************************** */

//定义打开按钮
class OpenButton {
  //点击后展示弹窗(旧逻辑)

  onClick() {
    const modal = new Modal();
    modal.style.display = 'block';
  }
}

//定义按钮对应的装饰器
class Decorator {
  //将按钮实例传入
  constructor(open_button) {
    this.open_button = open_button;
  }
  onClick() {
    this.open_button.onClick();
    //"包装" 了一层新逻辑
    this.changeButtonStatus();
  }
  changeButtonStatus() {
    this.changeButtonText();
    this.disableButton();
  }
  disableButton() {
    const btn = document.getElementById('open');
    btn.setAttribute('disabled', true);
  }

  changeButtonText() {
    const btn = document.getElementById('open');
    btn.innerText = '快去登录';
  }
}

const openButton = new OpenButton();
const decorator = new Decorator(openButton);

document.getElementById('open').addEventListener('click', function () {
  // openButton.onClick()
  // 此处可以分别尝试两个实例的onClick方法，验证装饰器是否生效
  decorator.onClick();
});

/***********************深入装饰器原理与优秀案例************************************ */
// 在 ES7 中，我们可以像写 python 一样通过一个@语法糖轻松地给一个类装上装饰器：

//装饰器函数 , 它的第一参数是目标类

function classDecorator(target) {
    console.log(target);
  target.hasDecorator = true;

  return target;
}

//也可以使用语法糖去装饰类里面的方法
function funcDecorator(target, name, descriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = function () {
    console.log('我是Func的装饰器逻辑');
    return originalMethod.apply(this, arguments);
  };
  return descriptor;
}

//将装饰器安装到button类上
@classDecorator // 此处target就是被装饰的类的本身
class Button {
  //Button类的相关逻辑

  @funcDecorator;//此处的target变成了Button.prototype
  onClick() {
    console.log("我是Func的原有逻辑");
  }
}

console.log('Button 是否被装饰了：', Button.hasDecorator);



document.getElementById('open').addEventListener('click',function () {
    openModal()
    changeButtonStatus()
})