export default class HttpUtils {
  //get 方法
  static get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      //调用fetch
      fetch(url)
        .then((res) => res.json())
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static post(url: string, data: object) {
    return new Promise((resolve, reject) => {
      // 调用fetch
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // 将object类型的数据格式化为合法的body参数
        body: this.changeData(data),
      })
        .then((response) => response.json())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  // body请求体的格式化方法
  static changeData(obj: any) {
    var prop,
      str = '';
    var i = 0;
    for (prop in obj) {
      if (!prop) {
        return;
      }
      if (i == 0) {
        str += prop + '=' + obj[prop];
      } else {
        str += '&' + prop + '=' + obj[prop];
      }
      i++;
    }
    return str;
  }
}

type Params = Record<string, string | number>;

function Ajax(
  type: string,
  url: string,
  data: Params,
  success: Function,
  failed: Function,
) {
  //创建ajax对象
  // var xhr = null
  // if(window.XMLHttpRequest){
  //   xhr = new XMLHttpRequest();
  // }else {
  //   xhr = new ActiveXObject("Microsoft.XMLHTTP")
  // }
  return {};
}

//使用 Ajax
Ajax(
  'get',
  'url',
  { name: 'thunderchen', age: 18 },
  function (data: any) {
    return data;
  },
  function (error: Error) {},
);

async function AjacAdapter(
  type: string,
  url: string,
  data: any,
  success: Function,
  failed: Function,
) {
  const typeCase = type.toUpperCase();
  let result: any;

  try {
    //实际的请求全部由新接口发起
    if (type === 'GET') {
      result = (await HttpUtils.get(url)) || {};
    } else if (type === 'POST') {
      result = (await HttpUtils.post(url, data)) || {};
    }
    result.statusCode =
      1 && success ? success(result) : failed(result.statusCode);
  } catch (error: any) {
    //捕捉网络错误
    if (failed) {
      failed(error.statusCode);
    }
  }
}

// axios中的适配器

var adapter = config.adapter || defaults.adapter;
// dispatchRequest方法的末尾调用的是适配器方法
return adapter(config).then(function onAdapterResolution(response) {
  //请求成功的回调
  throwIfCancellationRequested(config);

  // 转换响应体

  response.data = transformData(
    response.data,
    response.headers,
    config.transformResponse,
  );
    return response
},function onAdapterRejection(reason:any) {
  //请求失败的回调
  if (!isCancel(reason)) {
    throwIfCancellationRequested(config);

    //转换响应体
    if (reason && reason.response) {
      reason.response.data = transformData(
        reason.response.data,
        reason.response.headers,
        config.transformResponse
      );

      return Promise.reject(reason)

  }
});
//获取默认适配器
function getDefaultAdapter() {
  var adapter;
  // 判断当前是否是node环境
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // 如果是node环境，调用node专属的http适配器
    adapter = require('./adapters/http');
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // 如果是浏览器环境，调用基于xhr的适配器
    adapter = require('./adapters/xhr');
  }
  return adapter;
}

// http 适配器:

module.exports = function httpAdapter(config:any) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    // 具体逻辑
  }
}

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    // 具体逻辑
  }
}