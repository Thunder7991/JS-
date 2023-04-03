interface PubSub {
  observers: any[];
  add(observer: Observer): void;
}

//定义发布者类
class Publisher implements PubSub {
  observers: any[];
  constructor() {
    this.observers = [];
    console.log('Publisher creted');
  }
  // 添加订阅者
  add(observer: any) {
    console.log('Publisher.add invoked');
    this.observers.push(observer);
  }

  //   移除订阅者
  remove(observer: Observer) {
    console.log('Publisher.remove invoked');

    this.observers.forEach((item, i) => {
      if (item === observer) {
        this.observers.splice(i, 1);
      }
    });
  }

  // 通知所有订阅者
  notify() {
    console.log('Publisher.notify invoked');
    this.observers.forEach((observer) => {
      observer.update(this);
    });
  }
}

interface Obs {
  update(): void;
}

//定义订阅者 , 作为被动的一方, 它的行为只有两个 --- 被通知 /  去执行
// 本质上是取接受发布者的调用, 这步已经在Publisher中已经做掉了
class Observer implements Obs {
  constructor() {
    console.log('Observer created');
  }
  update() {
    console.log('Observer.update invoked');
  }
}

class PrdPublisher extends Publisher {
  prdState: null;
  constructor() {
    super();
    //初始化需求文档
    this.prdState = null;
    // 韩梅梅还没有拉群，开发群目前为空
    this.observers = [];
    console.log('PrdPublisher created');
  }
  //获取prdState
  getState() {
    console.log('prdPublisher.getState incoked');
    return this.prdState;
  }

  setState(state: any) {
    console.log('prdPublisher.setState invoked');
    // prd 的值发生改变
    this.prdState = state;
    //需求文档变更, 立即通知所有开发者
    this.notify();
  }
}

class DeveloperObserver extends Observer {
  prdState: {};
  constructor() {
    super();
    // 需求文档一开始还不存在，prd初始为空对象
    this.prdState = {};
    console.log('DeveloperObserver created');
  }

  // 重写一个具体的update方法
  update(publisher) {
    console.log('DeveloperObserver.update invoked');

    //更新需求文档
    this.prdState = publisher.getState();
    //调用工作函数
    this.work();
  }

  //work 方法, 一个专门搬砖的方法
  work() {
    //获取需求文档
    const prd = this.prdState;
    //  开始对需求文档提供信息搬砖
    console.log('begins');
  }
}

// 创建订阅者：前端开发李雷
const liLei = new DeveloperObserver()
// 创建订阅者：服务端开发小A（sorry。。。起名字真的太难了）
const A = new DeveloperObserver()
// 创建订阅者：测试同学小B
const B = new DeveloperObserver()
//创建发布者