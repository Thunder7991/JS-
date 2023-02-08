var data = [
  { id: 1, name: '用户管理', pid: 0, child: null },
  { id: 2, name: '菜单申请', pid: 1, child: null },
  { id: 3, name: '信息申请', pid: 1, child: null },
  { id: 4, name: '模块记录', pid: 2, child: null },
  { id: 5, name: '系统设置', pid: 0, child: null },
  { id: 6, name: '权限管理', pid: 5, child: null },
  { id: 7, name: '用户角色', pid: 6, child: null },
  { id: 8, name: '菜单设置', pid: 6, child: null },
];

function arrayToTree(items) {
  const result = []; // 存放结果集
  const itemMap = {}; //
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    let id = item.id;
    let pid = item.pid;
    //首先以id为键值添加到itemMap中
    if (!itemMap[id]) {
      itemMap[id] = {
        ...item,
        child: [],
      };
    }
    //将itemMap[id]添加到 result
    const treeItem = itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          child: [],
        };
      }
      //根据对象的特性，修改itemMap会直接修改result中的元素
      itemMap[pid].child.push(treeItem);
    }
  }
  return result;
}
let at = arrayToTree(data);
console.log(at);
