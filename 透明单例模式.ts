/**
 * 实现一个“透明”的单例类，用户从这个类中创建对象的时候，可以像使
 * 用其他任何普通类一样。在下面的例子中，我们将使用 CreateDiv 单例类，它的作用是负责在页
 * 面中创建唯一的 div 节点
 */

var instances = null
var CreateDiv: any = (function () {
    let CreateDiv = function (this: any, html: string) {
        this.html = html;
        this.init();
        instances = this;
    };
    CreateDiv.prototype.init = function () {
        var div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    };
    // console.log(CreateDiv);

    return CreateDiv;


})();

var a = instances ?? new CreateDiv('sven1');


// var b = new CreateDiv( 'sven2' );




