/*
 * @Author: thunderchen
 * @Date: 2023-02-08 14:58:18
 * @LastEditTime: 2023-02-09 19:12:07
 * @email: 853524319@qq.com
 * @Description: 适配器模式 : 解决的是两个主体之间的对接，两个主体的关系可以是平级，也可以是上下（包含），所谓的“抹平差异”，是指固定一个对接规则（接口），两端的主体各自做适配。
 */

export default class HttpUtils {
  //系统配置
  //get 方法
  static get(url) {
    return new Promise((resolve, rejcet) => {
      //调用fetch
      fetch(url)
        .then((response) => response.json())
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  // post方法，data以object形式传入
  static post(url, data) {
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
  static changeData(obj) {
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

async function postFetch() {
  //当我想使用fetch发起请求时, 只需要这样轻松地调用
  const URL = 'xxxx';
  //定义post入参
  const params = {
    // ...
  };
  //发起post请求
  const postResponse = (await HttpUtils.post(URL, params)) || {};

  // 发起get请求
  const getResponse = (await HttpUtils.get(URL)) || {};
}

// Ajax适配器函数，入参与旧接口保持一致
async function AjaxAdapter(type, url, data, success, failed) {
  const type = type.toUpperCase();
  let result;
  try {
    //实际的请求全部由新接口发起
    if (type === 'GET') {
      result = (await HttpUtils.get(url)) || {};
    } else if (type === 'POST') {
      result = (await HttpUtils.post(url, data)) || {};
    }
    //假设请求成功对应的状态码是1
    result.statusCode === 1 && success
      ? success(result)
      : failed(result.statusCode);
  } catch (error) {
    // 捕捉网络错误
    if (failed) {
      failed(error.statusCode);
    }
  }
}
//用适配器适配旧的ajax方法
async function Ajax(type, url, data, success, failed) {
  await AjaxAdapter(type, url, data, success, failed);
}

//因此我们只需要编写一个适配器函数Ajaxdaper,并用适配器去承接旧接口的参数, 就可以实现新旧接口的无缝衔接了


// axios 中的适配器
//若用户未手动设置适配器 , 则使用默认的适配器
// 若用户未手动配置适配器，则使用默认的适配器
var adapter = config.adapter || defaults.adapter;
  
  // dispatchRequest方法的末尾调用的是适配器方法
  return adapter(config).then(function onAdapterResolution(response) {
    // 请求成功的回调
    throwIfCancellationRequested(config);

    // 转换响应体
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    // 请求失败的回调
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // 转换响应体
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });




