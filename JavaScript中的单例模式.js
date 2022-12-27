var namespace1 = {
  a: function () {
    alert(1);
  },
  b: function () {
    alert(2);
  },
};

var MyApp = {};
MyApp.namespace = function (name) {
  var parts = name.split('.');
  console.log(13,parts);
  var current = MyApp;
  console.log(15,current);
  for (var i in parts) {
      console.log(17,parts[i]);
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
    console.log(22,current[parts[i]]);
  }
};
MyApp.namespace('event');
// MyApp.namespace('dom.style');

// 上述代码等价于：
// var MyApp = {
//     event: {},
//     dom: {
//         style: {}
//     }
// };

// var user = (function () {
//     var __name = 'sven',
//         __age = 29;
//     return {
//         getUserInfo: function () {
//             return __name + '-' + __age;
//         }
//     }
// })();
