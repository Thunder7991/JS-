//构造器模式

let lilei = {
  name: 'thunder',
  age: 24,
  career: 'coder',
};

let hanMeiMei = {
  name: '韩梅梅',
  age: 24,
  career: 'thunder',
};

function User(name, age, career) {
  this.name = name;
  this.age = age;
  this.career = career;
}
//上面的 User就是一个构造器
const user = new User(name, age, career);
//想User这样当新建对象的内存被分配后, 用来初始化该对象的特殊函数, 就叫做构造器

//很明显, 变的是每个user的姓名 年龄 工种 这些值,这是用户的个性 , 不变的是每个员工具备姓名 年龄 工种这些属性

//构造器不是将 name、age、career 赋值给对象的过程封装，确保了每个对象都具备这些属性，确保了共性的不变，同时将 name、age、career 各自的取值操作开放，确保了个性的灵活

// 工厂模式 直接上代码
function User(name, age, career, work) {
  this.name = name;
  this.age = age;
  this.career = career;
  this.work = work;
}
function Factory(name,age,career) {
    let work
    switch (career) {
        case "coder":
                work = ["thunder"]
            break;
    
        default:
            work = ["chen"]
            break;
    }

    return new User(name,age,career,work)
}

// 工厂模式就是将 创建的对象单独封装 
// 只关注结果 不关注过程 (拿到实例结果就行) , 目的就是为了无脑传参
//将创建对象的过程单独封装，这样的操作就是工厂模式

//工厂模式场景
// 有构造函数的地方，我们就应该想到简单工厂；在写了大量构造函数、调用了大量的 new、自觉非常不爽的情况下，我们就应该思考是不是可以掏出工厂模式重构我们的代码了。

