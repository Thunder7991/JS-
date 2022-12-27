//定义: 保证一个类仅有一个实例，并提供一个访问它的全局访问点。


interface Singgle {
    name: string;
    instance: any
}

class Singgleton<T extends Singgle> {
    name: T['name']
    instance: T['instance']
    constructor(data: T) {
        this.name = data.name
        this.instance = data.instance
    }
    getName(): void {
        console.log(this.name);
    }
    getInstance(data: T) {
        if (!this.instance) {
            this.instance = new Singgleton(data)
        }
        return this.instance;
    }
}

let SinggleTest = new Singgleton({ name: 'thunder', instance: 20 })
SinggleTest.getName()
//单例
let instance = SinggleTest.getInstance({ name: 'thunder', instance: 20 })
console.log(instance);

/**
 *  
 *
 *我们通过 Singleton.getInstance 来获取 Singleton 类的唯一对象，这种方式相对简单，但有
 * 一个问题，就是增加了这个类的“不透明性”，Singleton 类的使用者必须知道这是一个单例类，
 * 跟以往通过 new XXX 的方式来获取对象不同，这里偏要使用 Singleton.getInstance 来获取对象
 * 
 */


 




