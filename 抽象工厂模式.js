//抽象工厂模式
// 这个类就是最顶端的Boss -  AbstractFactory (抽象工厂)
class MobilePhoneFactory {
  //提供操作系统
  createOS() {
    throw new Error('抽象工厂方法不允许直接调用，你需要将我重写!');
  }
  //提供硬件接口
  createHardWare() {
    throw new Error('抽象工厂方法不允许直接调用，你需要将我重写！');
  }
}

//抽象工厂是不干活的
// 比如我们要生产一个 Android 系统 + 高通硬件的手机

// 具体工厂继承自抽象工厂
//调用了两个构造函数：AndroidOS 和 QualcommHardWare，它们分别用于生成具体的操作系统和硬件实例
class FakeStarFactory extends MobilePhoneFactory {
  createOS() {
    // 提供安卓系统实例
    return new AndroidOS();
  }
  createHardWare() {
    // 提供高通硬件实例
    return new QualcommHardWare();
  }
}
// ----------------------------------------------------------- |  ----------------------------------------------------------
//定义操作系统这类产品的抽象产品类
class OS {
  //操作硬件
  controlHardWare() {
    throw new Error('抽象产品方法不允许直接调用，你需要将我重写！');
  }
}

class AndroidOS extends OS {
  controlHardWare() {
    console.log('我会用安卓的方式去操作硬件');
  }
}
class AppleOS extends OS {
  controlHardWare() {
    console.log('我会用的方式去操作硬件');
  }
}

// ----------------------------------------------------------- |  ----------------------------------------------------------

//定义硬件产品类同理
class HardWare {
  // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
  operateByOrder() {
    throw new Error('抽象方法不许调用');
  }
}

// 定义具体硬件的具体产品类
class QualcommHardWare extends HardWare {
  operateByOrder() {
    console.log('我会用高通的方式去运转');
  }
}

class MiWare extends HardWare {
  operateByOrder() {
    console.log('我会用小米的方式去运转');
  }
}

//因此需要正常一台手机需要这样做

// 1.  这是我的手机
const myPhone = new FakeStarFactory();
//2. 植入操作系统
const myOS = myPhone.createOS();
//3. 安装硬件
const myHardWare = myPhone.createHardWare();
// 4. 开机
myOS.controlHardWare();
//5. 唤醒硬件
myHardWare.operateByOrder();
// -----------------------------------------------------------  |-----------------------------------------------------

// 如果来了新的设备 不需要对抽象工厂MobilePhoneFactory做任何修改

class newStarFactory extends MobilePhoneFactory {
  createOS() {
    // 操作系统实现代码
  }
  createHardWare() {
    // 硬件实现代码
  }
}
//对原有的系统不会造成任何潜在影响 所谓的“对拓展开放，对修改封闭”就这么圆满实现了

//四个角色
//抽象工厂（抽象类，它不能被用于生成具体实例） : 用于声明最终目标产品的共性
//具体工厂(用于生成产品族里的一个具体的产品) : 继承自抽象工厂、实现了抽象工厂里声明的那些方法，用于创建具体的产品的类。
// 抽象产品（抽象类，它不能被用于生成具体实例）
// 具体产品（用于生成产品族里的一个具体的产品所依赖的更细粒度的产品）
